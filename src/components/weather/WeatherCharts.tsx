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
    <section
      aria-label="Temperaturgraf"
      className="rounded-xl border border-blue-200 bg-white px-3 py-4 shadow-md sm:px-5 sm:py-5"
    >
      <h2 className="mb-3 text-sm font-bold text-blue-900 sm:text-xl text-center sm:text-left">
        Prognose for de sidste og næste 24 timer
      </h2>

      <FrontPageLineChart
        predictionData={predictionData}
        weatherData={historicalData}
      />
    </section>
  )
}
