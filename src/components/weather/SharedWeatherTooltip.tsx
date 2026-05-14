import {
  formatWeatherTooltipLabel,
  formatWeatherTooltipValue,
  type WeatherTooltipKey,
  weatherTooltipKeys,
} from "../../utils/chartTooltip"

type WeatherTooltipDatum = Partial<Record<WeatherTooltipKey, number>>

type SharedTooltipProps = {
  active?: boolean
  payload?: Array<{ payload?: WeatherTooltipDatum }>
  label?: unknown
}

export default function SharedWeatherTooltip({
  active,
  payload,
  label,
}: SharedTooltipProps) {
  if (!active || !payload || payload.length === 0) {
    return null
  }

  const dataPoint = payload[0]?.payload as WeatherTooltipDatum | undefined
  if (!dataPoint) {
    return null
  }

  return (
    <div
      className="rounded-lg border p-3 shadow-md"
      style={{
        backgroundColor: "#ffffff",
        borderColor: "#bfdbfe",
      }}
    >
      <div className="mb-2 text-sm font-semibold text-slate-700">
        {formatWeatherTooltipLabel(label)}
      </div>
      <div className="space-y-1">
        {weatherTooltipKeys.map((key) => {
          const value = dataPoint[key]
          if (
            value == null ||
            (typeof value === "number" && Number.isNaN(value))
          ) {
            return null
          }

          const [formattedValue, metricLabel] = formatWeatherTooltipValue(
            value,
            key,
          )

          return (
            <div
              key={key}
              className="flex items-center justify-between gap-4 text-sm text-slate-700"
            >
              <span>{metricLabel}</span>
              <span className="font-semibold text-slate-900">
                {formattedValue}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
