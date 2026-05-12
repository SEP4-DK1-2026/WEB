import WeatherOverview from "../../components/weather/WeatherOverview"
import WeatherCharts from "../../components/weather/WeatherCharts"
import { useWeatherData } from "../../hooks/useWeatherData"

export default function HomePage() {
  const weatherData = useWeatherData()

  return (
    <div className="space-y-5">
     

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