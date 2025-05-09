import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from statsmodels.tsa.arima.model import ARIMA
from pandas.tseries.offsets import DateOffset
import warnings

warnings.filterwarnings("ignore")  # Ignore warning messages

# Load the dataset directly
file_name = "CO2 dataset.csv"  # Set your CSV filename here
try:
    data = pd.read_csv(file_name)
    print("\nData successfully loaded!")
    print(data.head())  # Show first few rows

    # Convert the 'Year' column to DateTime format
    data['Year'] = pd.to_datetime(data['Year'], format='%Y')
    data.set_index('Year', inplace=True)

    # Train the ARIMA model
    model = ARIMA(data['CO2'], order=(3, 1, 4))
    model_fit = model.fit()

    # Forecast for 5 years
    future_dates = [data.index[-1] + DateOffset(years=x) for x in range(1, 6)]
    forecast = model_fit.predict(start=len(data), end=len(data) + 4, dynamic=True)

    # Store results in DataFrame
    forecast_df = pd.DataFrame({'Year': future_dates, 'Predicted_CO2': forecast.values})
    forecast_df.to_csv("forecast_results.csv", index=False)

    print("\nForecast for the next 5 years saved in 'forecast_results.csv'!")

    # Plot full data + forecast
    plt.figure(figsize=(10, 5))
    plt.plot(data.index, data['CO2'], label='Original Data')
    plt.plot(forecast_df['Year'], forecast_df['Predicted_CO2'], label='Forecast', linestyle='dashed')
    plt.title('CO2 Emission Forecast (Next 5 Years)')
    plt.xlabel('Year')
    plt.ylabel('CO2 Emissions')
    plt.legend()
    plt.show()

    # Plot only predictions
    plt.figure(figsize=(8, 4))
    plt.plot(forecast_df['Year'], forecast_df['Predicted_CO2'], linestyle='dashed', color='red')
    plt.title('Predicted CO2 Emissions (Next 5 Years)')
    plt.xlabel('Year')
    plt.ylabel('Predicted CO2 Emissions')
    plt.grid(True)
    plt.show()

except FileNotFoundError:
    print("\nError: File not found! Please check the filename and try again.")
except Exception as e:
    print(f"\nAn error occurred: {e}")

























   

