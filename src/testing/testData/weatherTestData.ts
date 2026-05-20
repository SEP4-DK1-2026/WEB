// src/testing/testData/weatherTestData.ts

import type { PredictionData, WeatherData } from "../../types/weatherData"

export const currentWeather: WeatherData = {
  date: new Date("2026-05-20T10:00:00"),
  temperature: 21.4,
  humidity: 65,
  precipitation: 0.5,
  windSpeed: 4.2,
  windDirection: 90,
  light: 12000,
}

export const predictedWeather: PredictionData = {
  predictedDate: new Date("2026-05-21T10:00:00"),
  predictionOffset: 24,
  temperature: 19.8,
  humidity: 70,
  precipitation: 1.2,
  windSpeed: 5.5,
  windDirection: 180,
  light: 9000,
}