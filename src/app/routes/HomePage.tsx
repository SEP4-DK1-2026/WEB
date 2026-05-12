import WeatherOverview from "../../components/weather/WeatherOverview"
import WeatherCharts from "../../components/weather/WeatherCharts"
import { useWeatherData } from "../../hooks/useWeatherData"

export default function HomePage() {
  const weatherData = useWeatherData()

  return (
    <div className="space-y-5">
      <section>
        <h1 className="mb-1 text-3xl font-bold text-gray-800">Vejrudsigt</h1>
        <p className="text-sm text-gray-600">
          Her ses nuværende og fremtidig vejr
        </p>
      </section>

      <WeatherOverview
        currentWeather={weatherData.currentWeather}
        predictedWeather={weatherData.predictedWeather}
        loading={weatherData.loading}
        error={weatherData.error}
      />

      <WeatherCharts
        historicalData={weatherData.historicalData}
        predictionData={weatherData.predictionData}
        loading={weatherData.loading}
        error={weatherData.error}
      />
    </div>
  )
}