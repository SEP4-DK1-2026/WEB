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

type MetricItemProps = {
  label: string
  value: string
  valueClassName: string
  children?: React.ReactNode
}

function MetricItem({
  label,
  value,
  valueClassName,
  children,
}: MetricItemProps) {
  return (
    <div className="rounded-lg bg-white px-4 py-3 shadow-sm">
      <p className="text-xs font-semibold text-gray-600">{label}</p>

      <div className="mt-1 flex items-center gap-2">
        <p className={`text-2xl font-bold leading-none ${valueClassName}`}>
          {value}
        </p>

        {children}
      </div>
    </div>
  )
}

export default function WeatherCard({
  title,
  data,
  displayDate,
}: WeatherCardProps) {
  const weatherIcon = getWeatherIcon(data)

  return (
    <article className="rounded-xl border border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100 p-3 shadow-md">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-blue-900">{title}</h2>
          <p className="mt-2 text-sm text-gray-600">
            {formatDate(displayDate)}
          </p>
        </div>

        <img
          src={weatherIcon}
          alt="Vejrikon"
          className="h-12 w-12 object-contain xl:h-16 xl:w-16"
        />
      </div>

      <div className="grid grid-cols-2 gap-4 xl:grid-cols-3">
        <MetricItem
          label="Temperatur"
          value={`${formatWholeNumber(data.temperature)}°C`}
          valueClassName="text-orange-500"
        />

        <MetricItem
          label="Luftfugtighed"
          value={`${formatWholeNumber(data.humidity)}%`}
          valueClassName="text-blue-500"
        />

        <MetricItem
          label="Nedbør"
          value={`${formatOneDecimal(data.precipitation)} mm`}
          valueClassName="text-cyan-500"
        />

        <MetricItem
          label="Vindhastighed"
          value={`${formatOneDecimal(data.windSpeed)} m/s`}
          valueClassName="text-indigo-500"
        />

        <MetricItem
          label="Vindretning"
          value={formatWindDirection(data.windDirection)}
          valueClassName="text-purple-500"
        >
          <span
            className="inline-block text-2xl text-blue-600 transition-transform"
            style={{
              transform: `rotate(${data.windDirection - 90}deg)`,
            }}
          >
            ➜
          </span>
        </MetricItem>

        <MetricItem
          label="Lys"
          value={`${formatWholeNumber(data.light)} lx`}
          valueClassName="text-yellow-500"
        />
      </div>
    </article>
  )
}
