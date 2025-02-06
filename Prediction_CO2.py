import pandas as pd  
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
from datetime import datetime

# Load dataset
df = pd.read_csv('df_info.csv')

# Convert timestamp column to datetime
df['Timestamp'] = pd.to_datetime(df['Timestamp'])
df.set_index('Timestamp', inplace=True)

# Extract time-based features
df['Year'] = df.index.year
df['Month'] = df.index.month
df['Day'] = df.index.day
df['Hour'] = df.index.hour

# Apply log transformation to stabilize CO2 values
df['Log_CO2'] = np.log1p(df['CO2 (ppm)'])

# Feature Engineering
df['CO2_Lag1'] = df['Log_CO2'].shift(1)  # Previous time step CO2 (log-transformed)
df['CO2_Moving_Avg'] = df['Log_CO2'].rolling(window=3, min_periods=1).mean()  # 3-step avg (log-transformed)
df['Month_Sin'] = np.sin(2 * np.pi * df['Month'] / 12)  # Seasonality
df['Month_Cos'] = np.cos(2 * np.pi * df['Month'] / 12)

# Drop NaN values created by shifting and rolling
df.dropna(inplace=True)

# Define target variable and features
target = 'Log_CO2'
features = ['Year', 'Month', 'Day', 'Hour', 'CO2_Lag1', 'CO2_Moving_Avg', 'Month_Sin', 'Month_Cos']

X = df[features]
y = df[target]

# Split data for training
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train optimized Random Forest Model
rf_model = RandomForestRegressor(n_estimators=200, max_depth=10, random_state=42)
rf_model.fit(X_train, y_train)

# Make predictions on test set
y_pred_log = rf_model.predict(X_test)
y_pred = np.expm1(y_pred_log)  # Reverse log transformation
y_test_exp = np.expm1(y_test)  # Convert test labels back

# Calculate error metrics
mae = mean_absolute_error(y_test_exp, y_pred)
rmse = np.sqrt(mean_squared_error(y_test_exp, y_pred))
r2 = r2_score(y_test, y_pred_log)  # Keep log-scale for r2

# Print metrics
print(f"Mean Absolute Error (MAE): {mae:.2f}")
print(f"Root Mean Squared Error (RMSE): {rmse:.2f}")
print(f"Model Accuracy (R² Score): {r2 * 100:.2f}%")

# Predict future emissions for the next 12 months
future_dates = pd.date_range(start=df.index[-1] + pd.DateOffset(months=1), periods=12, freq='ME')
future_df = pd.DataFrame({
    'Year': future_dates.year,
    'Month': future_dates.month,
    'Day': future_dates.day,
    'Hour': 0
})

# Add same transformations to future data
future_df['Month_Sin'] = np.sin(2 * np.pi * future_df['Month'] / 12)
future_df['Month_Cos'] = np.cos(2 * np.pi * future_df['Month'] / 12)

# Initialize CO2_Lag1 and CO2_Moving_Avg dynamically
last_co2 = df[target].iloc[-1]  # Last log-transformed value
recent_co2_values = list(df[target].iloc[-3:])  # Last three log values for moving avg
future_predictions_log = []

for i in range(len(future_df)):
    future_df.loc[i, 'CO2_Lag1'] = last_co2  # Use last predicted value as lag
    future_df.loc[i, 'CO2_Moving_Avg'] = np.mean(recent_co2_values)  # Dynamic moving avg
    
    # Predict CO2 emissions (log-transformed)
    pred_log = rf_model.predict(future_df.loc[[i], features])
    future_predictions_log.append(pred_log[0])
    
    # Update values for next iteration
    last_co2 = pred_log[0]
    recent_co2_values.append(pred_log[0])
    if len(recent_co2_values) > 3:
        recent_co2_values.pop(0)  # Keep only the last 3 values

# Convert predictions back from log scale
future_predictions = np.expm1(future_predictions_log)

# Save predictions to CSV
future_df['Predicted_Carbon_Emissions'] = future_predictions
future_df.to_csv('future_carbon_emissions.csv', index=False)

# Ensure continuity by adding the last known real CO2 value (for plotting)
plt.figure(figsize=(14, 7))

# Plot historical data
plt.plot(df.index, df['CO2 (ppm)'], label='Historical CO2 Emissions', color='blue', linewidth=2)

# Plot predicted data with uncertainty shading
plt.plot(future_dates, future_predictions, label='Predicted CO2 Emissions', color='red', linestyle='dashed', linewidth=2)
plt.fill_between(future_dates, future_predictions * 0.95, future_predictions * 1.05, color='red', alpha=0.2, label="Prediction Uncertainty")

# Add grid and titles with error metrics
plt.xlabel('Time', fontsize=12)
plt.ylabel('Carbon Emissions (ppm)', fontsize=12)
plt.title(f'Carbon Emissions Prediction for the Next 12 Months\nMAE: {mae:.2f}, RMSE: {rmse:.2f}', fontsize=14)
plt.legend()
plt.grid(True, linestyle='--', alpha=0.6)
plt.show()

# Histogram of Prediction Errors
plt.figure(figsize=(10, 5))
sns.histplot(y_test_exp - y_pred, bins=20, kde=True, color='purple')
plt.axvline(0, color='black', linestyle='dashed', linewidth=1)
plt.xlabel('Prediction Error (ppm)')
plt.ylabel('Frequency')
plt.title('Distribution of Prediction Errors')
plt.show()

# Bar chart for future emissions
plt.figure(figsize=(12, 6))
plt.bar(future_df['Month'], future_predictions, color='green', alpha=0.7)
plt.xlabel('Month', fontsize=12)
plt.ylabel('Predicted CO2 (ppm)', fontsize=12)
plt.title('Predicted Monthly CO2 Emissions', fontsize=14)
plt.xticks(future_df['Month'])
plt.grid(axis='y', linestyle='--', alpha=0.6)
plt.show()

# Scatter plot of actual vs. predicted
plt.figure(figsize=(7, 7))
plt.scatter(y_test_exp, y_pred, color='blue', alpha=0.5, label="Predictions")
plt.plot([min(y_test_exp), max(y_test_exp)], [min(y_test_exp), max(y_test_exp)], color='red', linestyle='dashed', label="Perfect Fit")
plt.xlabel('Actual CO2 (ppm)', fontsize=12)
plt.ylabel('Predicted CO2 (ppm)', fontsize=12)
plt.title('Actual vs. Predicted CO2 Emissions', fontsize=14)
plt.legend()
plt.grid(True, linestyle='--', alpha=0.6)
plt.show()
