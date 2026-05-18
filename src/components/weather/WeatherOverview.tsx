import WeatherCard from "./WeatherCard"
import loadingSvg from "../../assets/loading.svg"
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
    return (
      <div className="rounded-xl border border-blue-200 bg-white p-6 shadow-md">
        <div className="flex items-center gap-3">
          <img
            src={loadingSvg}
            alt="Indlæser"
            className="h-10 w-10"
          />
          <p className="text-sm font-semibold text-blue-900">
            Indlæser vejrdata...
          </p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6 shadow-md">
        <p className="text-sm font-semibold text-red-700">
          Der opstod en fejl.
        </p>
        <p className="mt-2 text-sm text-red-600">{error}</p>
      </div>
    )
  }

  if (!currentWeather || !predictedWeather) {
    return (
      <div className="rounded-xl border border-blue-200 bg-white p-6 shadow-md">
        <p className="text-sm font-semibold text-blue-900">
          Ingen vejrdata fundet.
        </p>
        <p className="mt-2 text-sm text-gray-600">
          Prøv igen om et øjeblik.
        </p>
      </div>
    )
  }

 return (
  <section
    data-testid="weather-overview"
    aria-label="Oversigt over nuværende og forventet vejr"
    className="fade-in grid grid-cols-1 gap-8 xl:grid-cols-2"
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