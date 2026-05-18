import { useEffect, useState } from "react"
import { useWeatherModel } from "../context/WeatherModelContext"

import {
  getLatestWeather,
  getPredictionNext24Hours,
  getLast24Hours,
  getPredictionsLastAndNext24Hours,
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
  const { modelName } = useWeatherModel()

  useEffect(() => {
    async function loadWeather() {
      try {
        setLoading(true)
        setError(null)

        const [current, predicted, historical, predictions] = await Promise.all(
          [
            getLatestWeather(),
            getPredictionNext24Hours(modelName),
            getLast24Hours(),
            getPredictionsLastAndNext24Hours(modelName),
          ],
        )

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
  }, [modelName])

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
