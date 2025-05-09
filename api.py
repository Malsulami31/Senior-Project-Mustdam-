from fastapi import FastAPI
from fastapi.responses import JSONResponse
import pandas as pd
import os
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Update with your frontend's URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configurable path to the CSV file
CSV_FILE_PATH = os.getenv("CSV_FILE_PATH", "/Users/ghadihersi/Downloads/CO2_Forecasting-main 2/forecast_predictions.csv")

# Function to read CSV and return JSON data
def read_csv_to_json():
    try:
        if not os.path.exists(CSV_FILE_PATH):
            return {"error": "CSV file not found. Please ensure the model has generated the file."}
        
        data = pd.read_csv(CSV_FILE_PATH)
        
        # Validate required columns
        if "Timestamp" not in data.columns or "Forecast" not in data.columns:
            return {"error": "Invalid CSV format. Required columns: 'Timestamp', 'Forecast'."}
        #Converts the DataFrame to a list of dictionaries, where each row represents a record in JSON format
        forecast_data = data.to_dict(orient='records')
        return forecast_data
    except Exception as e:
        return {"error": f"An error occurred while processing the CSV file: {str(e)}"}

@app.get("/forecast2/")#Provides a paginated API to serve the forecast data.
async def get_forecast2(skip: int = 0, limit: int = 100):
    forecast_data = read_csv_to_json()
    if "error" in forecast_data:
        return JSONResponse(content=forecast_data, status_code=400)
    
    paginated_data = forecast_data[skip: skip + limit]
    return JSONResponse(content=paginated_data)

