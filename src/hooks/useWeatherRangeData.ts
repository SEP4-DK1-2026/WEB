import { useState } from "react"
import {
  getHistoricalDataInRangeUsingDates,
  getPredictionsInRangeUsingDates,
} from "../features/fetch-weather-data/api/weatherApi"
import type { PredictionData, WeatherData } from "../types/weatherData"

type RangeMode = "historical" | "prediction"

export function useWeatherRangeData(mode: RangeMode) {
  const [data, setData] = useState<WeatherData[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function loadRange(startDate: Date, endDate: Date) {
    try {
      setLoading(true)
      setError(null)

      if (mode === "historical") {
        const result = await getHistoricalDataInRangeUsingDates(
          startDate,
          endDate,
        )

        setData(result)
        return
      }

      const predictions = await getPredictionsInRangeUsingDates(
        startDate,
        endDate,
      )

      const mappedPredictionData: WeatherData[] = predictions.map(
        (entry: PredictionData) => ({
          temperature: entry.temperature,
          humidity: entry.humidity,
          windSpeed: entry.windSpeed,
          windDirection: entry.windDirection,
          precipitation: entry.precipitation,
          light: entry.light,
          date: entry.predictedDate,
        }),
      )

      setData(mappedPredictionData)
    } catch {
      setError("Kunne ikke hente vejrdata for den valgte periode.")
    } finally {
      setLoading(false)
    }
  }

  return {
    data,
    loading,
    error,
    loadRange,
  }
}