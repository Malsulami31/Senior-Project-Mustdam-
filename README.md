
# CO2 Forecasting

This repository contains scripts and notebooks for forecasting CO2 levels using data from an STM32 CO2 sensor. The project involves collecting sensor data, enhancing it, and using time series forecasting models to predict future CO2 levels.

## Overview

The repository is divided into several parts:

1. **[Data Collection](Data_plot.py)**: A Python script for reading UART data from the STM32 CO2 sensor, saving it to a CSV file, and plotting the collected data when stopped with **CTRL+C**.
2. **[Data Enhancement](Enhanche_data.py)**: A Python script for preprocessing the data by adding lags, splitting dates, and handling occupancy.
3. **[Forecasting](CO2_prevision.ipynb)**: A Colab notebook that performs time series forecasting on the enhanced data using SARIMAX models.

## Table of Contents

- [Introduction](#introduction)
- [STM32 Projects](#stm32-projects)
- [Data Collection](#data-collection)
- [Data Processing](#data-processing)
- [Time Series Analysis](#time-series-analysis)
- [Results](#results)
- [Usage](#usage)
- [Warning](#warning)
- [Contributing](#contributing)

## Introduction

This project aims to forecast CO2 levels using data collected from an STM32-based CO2 sensor. The data is processed and analyzed using Python libraries to create predictive models.


## Data Collection

Data was collected over a period of two weeks in a single room at work. The measurements were taken using a CO2 sensor connected to an STM32 microcontroller. The collected data includes CO2 levels, temperature and humidity.

## Data Processing

Data processing involves cleaning and preparing the dataset for analysis. The steps include:
- Handling missing values
- Removing infinite values
- Normalizing the data
- Creating lag features

## Time Series Analysis

Time series analysis is performed using the SARIMAX model to forecast future CO2 levels. The analysis includes:
- Checking for stationarity
- Differencing the data if necessary
- Auto ARIMA to find the best model parameters
- Fitting the SARIMAX model

## Results

The results include the forecasted CO2 levels compared to the actual data. The predictions are visualized to show the accuracy of the model.

## Usage

To use this project:
1. Clone the repository.
2. Install the necessary Python libraries.
3. Run the data processing and analysis scripts.
4. Use the provided Jupyter notebooks for detailed analysis and visualization.


## Key Points:
- **Accuracy**: The forecasted results and accuracy metrics are based on the data and methods used during the internship. These estimates may not be fully accurate or reliable for practical applications.
- **Data Collection**: The data was collected over a two-week period in a single room at work, which may not represent broader or different conditions.
- **Model Limitations**: The forecasting models used in this project are based on certain assumptions and parameters which may not generalize well beyond the specific context of the collected data.

For any critical applications, further validation and refinement of the models and methods should be performed. Use the findings from this project as a starting point for further exploration and development.

# Senior-Project-Mustdam-
 Saudi Arabia's First Carbon Credit Market Mustdam contributes to the development of one of the first carbon credit markets and emission management in Saudi Arabia that helps organizations adhere to standards and reduce its emissions more effectively. It's a comprehensive solution for sustainable success.

