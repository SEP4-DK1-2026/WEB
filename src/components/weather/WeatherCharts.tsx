import type { PredictionData, WeatherData } from "../../types/weatherData"
import TemperatureLineChart from "./TemperatureLineChart"
import MyLineChart from "./MyLineChart"
import FrontPageLineChart from "./FrontPageChart"

type WeatherChartsProps = {
  historicalData: WeatherData[]
  predictionData: PredictionData[]
  loading: boolean
  error: string | null
}

// function predictionToWeatherData(data: PredictionData[]): WeatherData[] {
//   return data.map((entry) => ({
//     temperature: entry.temperature,
//     humidity: entry.humidity,
//     windSpeed: entry.windSpeed,
//     windDirection: entry.windDirection,
//     precipitation: entry.precipitation,
//     light: entry.light,
//     date: entry.predictedDate,
//   }))
// }

export default function WeatherCharts({
  historicalData,
  predictionData,
  loading,
  error,
}: WeatherChartsProps) {
  if (loading || error) return null

  // const predictionChartData = predictionToWeatherData(predictionData)
  // const combinedData = [...historicalData, ...predictionChartData]

  return (
    <div className="rounded-xl border border-blue-200 bg-white p-6 shadow-lg">
      <h2 className="mb-4 text-2xl font-bold text-blue-900">
        Temperatur sidste 24 timer
      </h2>

      <FrontPageLineChart predictionData={predictionData} weatherData={historicalData} />
    </div>
  )
}
