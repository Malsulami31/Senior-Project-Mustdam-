import pandas as pd
df = pd.read_csv('labeled_sensor_data.csv', low_memory=False)

# Print column names to verify
print(df.columns)

# Select the correct columns
if 'CO2 (ppm)' in df.columns and 'Timestamp' in df.columns and 'Hour' in df.columns and  'Day' in df.columns and 'Month' in df.columns:
    df_info = df[['CO2 (ppm)', 'Timestamp','Hour','Day','Month']]  # Use actual column names
    df_info.to_csv('df_info.csv', index=False)
    print("df_info.csv has been created successfully.")
else:
    print("Error: Required columns not found in the dataset.")
