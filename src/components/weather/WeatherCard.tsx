import type { PredictionData, WeatherData } from "../../types/weatherData"
import { getWeatherIcon } from "../../utils/weatherIcons"
import {
  formatDate,
  formatOneDecimal,
  formatWholeNumber,
  formatWindDirection,
} from "../../utils/weatherFormatting"

type WeatherMetricData = WeatherData | PredictionData

type WeatherCardProps = {
  title: string
  data: WeatherMetricData
  displayDate: Date
}

export default function WeatherCard({
  title,
  data,
  displayDate,
}: WeatherCardProps) {
  const weatherIcon = getWeatherIcon(data)

  return (
    <div className="rounded-xl border border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100 p-8 shadow-lg">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-blue-900">{title}</h2>
          <p className="mt-2 text-sm text-gray-600">
            {formatDate(displayDate)}
          </p>
        </div>

        <img
          src={weatherIcon}
          alt="Vejrikon"
          className="h-20 w-20 object-contain"
        />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="rounded-lg bg-white p-4 shadow-md">
          <p className="text-sm font-semibold text-gray-600">Temperatur</p>
          <p className="mt-2 text-3xl font-bold text-orange-500">
            {formatWholeNumber(data.temperature)}°C
          </p>
        </div>

        <div className="rounded-lg bg-white p-4 shadow-md">
          <p className="text-sm font-semibold text-gray-600">Luftfugtighed</p>
          <p className="mt-2 text-3xl font-bold text-blue-500">
            {formatWholeNumber(data.humidity)}%
          </p>
        </div>

        <div className="rounded-lg bg-white p-4 shadow-md">
          <p className="text-sm font-semibold text-gray-600">Nedbør</p>
          <p className="mt-2 text-3xl font-bold text-cyan-500">
            {formatOneDecimal(data.precipitation)} mm
          </p>
        </div>

        <div className="rounded-lg bg-white p-4 shadow-md">
          <p className="text-sm font-semibold text-gray-600">Vindhastighed</p>
          <p className="mt-2 text-3xl font-bold text-indigo-500">
            {formatOneDecimal(data.windSpeed)} m/s
          </p>
        </div>

        <div className="rounded-lg bg-white p-4 shadow-md">
          <p className="text-sm font-semibold text-gray-600">Vindretning</p>

          <div className="mt-2 flex items-center gap-3">
            <p className="text-3xl font-bold text-purple-500">
              {formatWindDirection(data.windDirection)}
            </p>

            <span
              className="inline-block text-3xl text-blue-600 transition-transform"
              style={{
                transform: `rotate(${data.windDirection - 90}deg)`,
              }}
            >
              ➜
            </span>
          </div>
        </div>

        <div className="rounded-lg bg-white p-4 shadow-md">
          <p className="text-sm font-semibold text-gray-600">Lys</p>
          <p className="mt-2 text-3xl font-bold text-yellow-500">
            {formatWholeNumber(data.light)} lx
          </p>
        </div>
      </div>
    </div>
  )
}