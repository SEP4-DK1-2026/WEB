import {
  formatDate as formatDateTime,
  formatOneDecimal,
  formatWholeNumber,
} from "./weatherFormatting"

type TooltipConfig = {
  label: string
  format: (value: number) => string
  unit: string
}

function toDate(value: Date | string | number) {
  return value instanceof Date ? value : new Date(value)
}

const tooltipConfigByKey: Record<string, TooltipConfig> = {
  temperature: {
    label: "Temperatur",
    format: formatOneDecimal,
    unit: "°C",
  },
  humidity: {
    label: "Luftfugtighed",
    format: formatWholeNumber,
    unit: "%",
  },
  precipitation: {
    label: "Nedbør",
    format: formatOneDecimal,
    unit: "mm",
  },
}

export function formatWeatherTooltipLabel(value: unknown) {
  if (
    !(value instanceof Date) &&
    typeof value !== "string" &&
    typeof value !== "number"
  ) {
    return ""
  }

  return formatDateTime(toDate(value))
}

export function formatWeatherTooltipValue(value: unknown, name: unknown) {
  const key = typeof name === "string" ? name : String(name ?? "")
  const config = tooltipConfigByKey[key]
  const numericValue = typeof value === "number" ? value : Number(value)

  if (!config || Number.isNaN(numericValue)) {
    return [String(value ?? ""), key]
  }

  return [`${config.format(numericValue)}${config.unit}`, config.label]
}

export function formatWeatherAxisTick(
  value: unknown,
  key: keyof typeof tooltipConfigByKey,
) {
  const config = tooltipConfigByKey[key]
  const numericValue = typeof value === "number" ? value : Number(value)

  if (Number.isNaN(numericValue)) {
    return String(value ?? "")
  }

  return `${config.format(numericValue)}${config.unit}`
}
