import { useEffect, useState } from "react"

import {
  getLatestWeather,
  getPrediction24Hours,
  getLast24Hours,
  getPrediction,
} from "../features/fetch-weather-data/api/weatherApi"

import type { PredictionData, WeatherData } from "../types/weatherData"

export function useWeatherData() {
  const [currentWeather, setCurrentWeather] = useState<WeatherData | null>(null)
  const [predictedWeather, setPredictedWeather] =
    useState<PredictionData | null>(null)

  const [historicalData, setHistoricalData] = useState<WeatherData[]>([])
  const [predictionData, setPredictionData] = useState<PredictionData[]>([])

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadWeather() {
      try {
        setLoading(true)
        setError(null)

        const [current, predicted, historical, predictions] =
          await Promise.all([
            getLatestWeather(),
            getPrediction24Hours(),
            getLast24Hours(),
            getPrediction(24),
          ])

        setCurrentWeather(current)
        setPredictedWeather(predicted)
        setHistoricalData(historical)
        setPredictionData(predictions)
      } catch (error) {
    console.error(error)
    setError("Kunne ikke hente vejrdata.")
    } finally {
        setLoading(false)
      }
    }

    void loadWeather()
  }, [])

  return {
    currentWeather,
    predictedWeather,
    historicalData,
    predictionData,
    loading,
    error,
  }
}

export type UseWeatherDataReturn = ReturnType<typeof useWeatherData>