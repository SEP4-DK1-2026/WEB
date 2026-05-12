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
    className="rounded-xl border border-blue-200 bg-white p-5 shadow-md"
  >
    <h2 className="mb-3 text-xl font-bold text-blue-900">
      Temperatur sidste 24 timer og næste 24 timer
    </h2>

    <FrontPageLineChart
      predictionData={predictionData}
      weatherData={historicalData}
    />
  </section>
  )
}