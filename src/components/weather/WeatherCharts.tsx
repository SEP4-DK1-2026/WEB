import type { PredictionData, WeatherData } from "../../types/weatherData"
import FrontPageLineChart from "./FrontPageChart"

type WeatherChartsProps = {
  historicalData: WeatherData[]
  predictionData: PredictionData[]
  loading: boolean
  error: string | null
}

export default function WeatherCharts({
  historicalData,
  predictionData,
  loading,
  error,
}: WeatherChartsProps) {
  if (loading || error) return null

  return (
    <div className="rounded-xl border border-blue-200 bg-white p-6 shadow-lg">
      <h2 className="mb-4 text-2xl font-bold text-blue-900">
        Prognose for de sidste og næste 24 timer
      </h2>

      <FrontPageLineChart predictionData={predictionData} weatherData={historicalData} />
    </div>
  )
}
