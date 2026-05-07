import type { PredictionData, WeatherData } from "../../types/weatherData"
import TemperatureLineChart from "./TemperatureLineChart"
import MyLineChart from "./MyLineChart"

type WeatherChartsProps = {
  historicalData: WeatherData[]
  predictionData: PredictionData[]
  loading: boolean
}

function predictionToWeatherData(data: PredictionData[]): WeatherData[] {
  return data.map((entry) => ({
    temperature: entry.temperature,
    humidity: entry.humidity,
    windSpeed: entry.windSpeed,
    windDirection: entry.windDirection,
    precipitation: entry.precipitation,
    light: entry.light,
    date: entry.predictedDate,
  }))
}

export default function WeatherCharts({
  historicalData,
  predictionData,
  loading,
}: WeatherChartsProps) {
  if (loading) return null

  const predictionChartData = predictionToWeatherData(predictionData)

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      <div className="rounded-xl border border-blue-200 bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-2xl font-bold text-blue-900">
          Temperatur sidste 24 timer
        </h2>

        <TemperatureLineChart data={historicalData} />
      </div>

      <div className="rounded-xl border border-blue-200 bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-2xl font-bold text-blue-900">
          Temperatur næste 24 timer
        </h2>

        <MyLineChart data={predictionChartData} />
      </div>
    </div>
  )
}