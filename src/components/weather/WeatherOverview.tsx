import WeatherCard from "./WeatherCard"
import type { UseWeatherDataReturn } from "../../hooks/useWeatherData"

type WeatherOverviewProps = Pick<
  UseWeatherDataReturn,
  "currentWeather" | "predictedWeather" | "loading" | "error"
>

export default function WeatherOverview({
  currentWeather,
  predictedWeather,
  loading,
  error,
}: WeatherOverviewProps) {
  if (loading) {
    return <p className="text-gray-600">Indlæser vejrdata...</p>
  }

  if (error) {
    return <p className="text-red-600">{error}</p>
  }

  if (!currentWeather || !predictedWeather) {
    return <p className="text-gray-600">Ingen vejrdata fundet.</p>
  }

  return (
    <section
      data-testid="weather-overview"
      aria-label="Oversigt over nuværende og forventet vejr"
      className="grid grid-cols-1 gap-8 md:grid-cols-2"
    >
      <WeatherCard
        title="Nuværende vejr"
        data={currentWeather}
        displayDate={currentWeather.date}
      />

      <WeatherCard
        title="Forventet vejr"
        data={predictedWeather}
        displayDate={predictedWeather.predictedDate}
      />
    </section>
  )
}