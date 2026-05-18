import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { useEffect, useState } from "react"
import type { PredictionData, WeatherData } from "../../types/weatherData"
import { formatDateNoYear, formatTime } from "../../utils/dateFormat"
import {
  formatWeatherAxisTickWhole,
  formatWeatherTooltipLabel,
  formatWeatherTooltipValue,
  type WeatherTooltipKey,
  weatherTooltipKeys,
} from "../../utils/chartTooltip"
import { scaleTimeSeriesData } from "../../utils/scaleTimeSeries"

type FrontPageLineChartProps = {
  predictionData: PredictionData[]
  weatherData: WeatherData[]
  includeLegend?: boolean
  includeYticks?: boolean
}

type FrontPagePoint = {
  date: Date
  temperature?: number
  humidity?: number
  precipitation?: number
  windSpeed?: number
  windDirection?: number
  light?: number
  predictionOffset?: number
  actualTemperature?: number
  predictedTemperature?: number
  prediction?: WeatherTooltipDatum
}

const MS_PER_HOUR = 60 * 60 * 1000
const RANGE_MS = 24 * MS_PER_HOUR
const TICK_INTERVAL_HOURS = 6
const SMALL_TICK_INTERVAL_HOURS = 12
const SMALL_SCREEN_QUERY = "(max-width: 640px)"
const AXIS_LABEL_COLOR = "#64748b"
const PREDICTION_MATCH_TOLERANCE_MS = 60 * 60 * 1000
const predictionTooltipKeys = weatherTooltipKeys.filter(
  (key) => key !== "windDirection" && key !== "light",
) as WeatherTooltipKey[]

type WeatherTooltipDatum = Partial<Record<WeatherTooltipKey, number>>

type AxisTickProps = {
  x?: number
  y?: number
  payload?: {
    value?: number
  }
}

function getTimeTicks(
  startMs: number,
  endMs: number,
  intervalHours: number = TICK_INTERVAL_HOURS,
) {
  if (!Number.isFinite(startMs) || !Number.isFinite(endMs)) return []

  const intervalMs = intervalHours * MS_PER_HOUR
  const start = new Date(startMs)

  start.setMinutes(0, 0, 0)
  const remainder = start.getHours() % intervalHours
  start.setHours(start.getHours() - remainder)

  const ticks: number[] = []
  for (let time = start.getTime(); time <= endMs; time += intervalMs) {
    if (time >= startMs && time <= endMs) {
      ticks.push(time)
    }
  }

  return ticks
}

function TimeDateTick({ x = 0, y = 0, payload }: AxisTickProps) {
  const value = payload?.value
  if (typeof value !== "number") {
    return null
  }

  const date = new Date(value)

  return (
    <g transform={`translate(${x},${y})`}>
      <text textAnchor="middle" fill={AXIS_LABEL_COLOR} fontSize={12}>
        <tspan x="0" dy="0.6em">
          {formatTime(date)}
        </tspan>
        <tspan x="0" dy="1.2em">
          {formatDateNoYear(date)}
        </tspan>
      </text>
    </g>
  )
}

type FrontPageTooltipProps = {
  active?: boolean
  payload?: Array<{ payload?: FrontPagePoint }>
  label?: unknown
}

function pickTooltipDatum(source: {
  temperature?: number
  humidity?: number
  precipitation?: number
  windSpeed?: number
  windDirection?: number
  light?: number
  predictionOffset?: number
}): WeatherTooltipDatum {
  return {
    temperature: source.temperature,
    humidity: source.humidity,
    precipitation: source.precipitation,
    windSpeed: source.windSpeed,
    windDirection: source.windDirection,
    light: source.light,
    predictionOffset: source.predictionOffset,
  }
}

function TooltipRows({
  data,
  keys = weatherTooltipKeys,
}: {
  data: WeatherTooltipDatum
  keys?: WeatherTooltipKey[]
}) {
  return (
    <>
      {keys.map((key) => {
        const value = data[key]
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
    </>
  )
}

function FrontPageTooltip({ active, payload, label }: FrontPageTooltipProps) {
  if (!active || !payload || payload.length === 0) {
    return null
  }

  const dataPoint = payload[0]?.payload
  if (!dataPoint) {
    return null
  }

  const actualDatum = pickTooltipDatum(dataPoint)
  const predictionDatum = dataPoint.prediction

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
        <TooltipRows data={actualDatum} />
      </div>
      {predictionDatum && (
        <>
          <div className="mt-2 border-t border-slate-200 pt-2 text-xs font-semibold uppercase text-slate-500">
            Forudsigelse
          </div>
          <div className="space-y-1">
            <TooltipRows data={predictionDatum} keys={predictionTooltipKeys} />
          </div>
        </>
      )}
    </div>
  )
}

function findNearestPrediction(
  predictions: PredictionData[],
  targetMs: number,
) {
  let closest: PredictionData | undefined
  let closestDelta = Number.POSITIVE_INFINITY

  for (const entry of predictions) {
    const delta = Math.abs(entry.predictedDate.getTime() - targetMs)
    if (delta < closestDelta) {
      closestDelta = delta
      closest = entry
    }
  }

  if (closestDelta > PREDICTION_MATCH_TOLERANCE_MS) {
    return undefined
  }

  return closest
}

export default function FrontPageLineChart({
  predictionData,
  weatherData,
  includeLegend = true,
  includeYticks = true,
}: FrontPageLineChartProps) {
  const [isSmallScreen, setIsSmallScreen] = useState(false)

  useEffect(() => {
    if (
      typeof window === "undefined" ||
      typeof window.matchMedia !== "function"
    ) {
      setIsSmallScreen(false)
      return
    }

    const mediaQuery = window.matchMedia(SMALL_SCREEN_QUERY)
    const handleChange = (event: MediaQueryListEvent) =>
      setIsSmallScreen(event.matches)

    setIsSmallScreen(mediaQuery.matches)

    if (!mediaQuery.addEventListener) return

    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

  const latestHistoricalMs = weatherData.reduce((latest, entry) => {
    const time = entry.date.getTime()
    return time > latest ? time : latest
  }, Number.NEGATIVE_INFINITY)

  const fallbackReferenceMs =
    predictionData[0]?.predictedDate.getTime() ?? Date.now()

  const referenceMs = Number.isFinite(latestHistoricalMs)
    ? latestHistoricalMs
    : fallbackReferenceMs

  const rangeStartMs = referenceMs - RANGE_MS
  const rangeEndMs = referenceMs + RANGE_MS

  const filteredHistorical = weatherData.filter((entry) => {
    const time = entry.date.getTime()
    return time >= rangeStartMs && time <= referenceMs
  })

  const filteredPrediction = predictionData.filter((entry) => {
    const time = entry.predictedDate.getTime()
    return time >= referenceMs && time <= rangeEndMs
  })

  const historicalPredictions = predictionData.filter((entry) => {
    const time = entry.predictedDate.getTime()
    return time >= rangeStartMs && time <= referenceMs
  })

  const scaledHistorical = scaleTimeSeriesData(
    filteredHistorical,
    (entry) => entry.date,
  )
  const scaledPrediction = scaleTimeSeriesData(
    filteredPrediction,
    (entry) => entry.predictedDate,
  )

  const pointsByTime = new Map<number, FrontPagePoint>()

  for (const entry of scaledHistorical) {
    const key = entry.date.getTime()
    const existing = pointsByTime.get(key)
    const predictionMatch = historicalPredictions.length
      ? findNearestPrediction(historicalPredictions, key)
      : undefined
    const predictionDatum = predictionMatch
      ? pickTooltipDatum(predictionMatch)
      : undefined

    pointsByTime.set(key, {
      date: entry.date,
      temperature: existing?.temperature ?? entry.temperature,
      humidity: existing?.humidity ?? entry.humidity,
      precipitation: existing?.precipitation ?? entry.precipitation,
      windSpeed: existing?.windSpeed ?? entry.windSpeed,
      windDirection: existing?.windDirection ?? entry.windDirection,
      light: existing?.light ?? entry.light,
      actualTemperature: entry.temperature,
      predictedTemperature: existing?.predictedTemperature,
      prediction: existing?.prediction ?? predictionDatum,
    })
  }

  for (const entry of scaledPrediction) {
    const key = entry.predictedDate.getTime()
    const existing = pointsByTime.get(key)

    pointsByTime.set(key, {
      date: entry.predictedDate,
      temperature: existing?.temperature ?? entry.temperature,
      humidity: existing?.humidity ?? entry.humidity,
      precipitation: existing?.precipitation ?? entry.precipitation,
      windSpeed: existing?.windSpeed ?? entry.windSpeed,
      windDirection: existing?.windDirection ?? entry.windDirection,
      light: existing?.light ?? entry.light,
      predictionOffset: existing?.predictionOffset ?? entry.predictionOffset,
      actualTemperature: existing?.actualTemperature,
      predictedTemperature: entry.temperature,
      prediction: existing?.prediction,
    })
  }

  const combinedData = Array.from(pointsByTime.values()).sort(
    (a, b) => a.date.getTime() - b.date.getTime(),
  )

  const tickIntervalHours = isSmallScreen
    ? SMALL_TICK_INTERVAL_HOURS
    : TICK_INTERVAL_HOURS
  const timeTicks = getTimeTicks(rangeStartMs, rangeEndMs, tickIntervalHours)
  const yAxisFormatter = includeYticks
    ? (value: number) => formatWeatherAxisTickWhole(value, "temperature")
    : () => ""
  const chartMargin = isSmallScreen
    ? { top: 0, right: 16, left: 0, bottom: 0 }
    : { top: 0, right: 60, left: 0, bottom: 0 }
  const yAxisTickSize = isSmallScreen ? 10 : 12
  const yAxisWidth = isSmallScreen ? 36 : 60
  const yAxisTickMargin = isSmallScreen ? 2 : 5

  return (
    <ResponsiveContainer width="100%" height={360}>
      <LineChart data={combinedData} margin={chartMargin}>
        <CartesianGrid stroke="#aaa" strokeOpacity={0.2} />
        <Line
          type="monotone"
          dataKey="actualTemperature"
          stroke="red"
          strokeWidth={2}
          name="Målt temperatur"
          dot={false}
          activeDot={{ stroke: "black" }}
        />
        <Line
          type="monotone"
          dataKey="predictedTemperature"
          stroke="#2563eb"
          strokeWidth={2}
          name="Forudsagt temperatur"
          dot={false}
          activeDot={{ stroke: "black" }}
        />

        <XAxis
          dataKey={(entry: FrontPagePoint) => entry.date.getTime()}
          type="number"
          scale="time"
          domain={[rangeStartMs, rangeEndMs]}
          ticks={timeTicks.length > 0 ? timeTicks : undefined}
          tick={<TimeDateTick />}
          interval={0}
          tickMargin={8}
          height={44}
        />

        <YAxis
          stroke={AXIS_LABEL_COLOR}
          tickLine={includeYticks}
          tick={{ fill: AXIS_LABEL_COLOR, fontSize: yAxisTickSize }}
          width={yAxisWidth}
          tickFormatter={yAxisFormatter}
          tickMargin={yAxisTickMargin}
        />
        <Tooltip
          cursor={{ stroke: "#bfdbfe" }}
          content={<FrontPageTooltip />}
        />
        {includeLegend && (
          <Legend
            verticalAlign="top"
            align="right"
            formatter={(value) => (
              <span className="text-xs sm:text-sm font-semibold text-slate-700">
                {value}
              </span>
            )}
            wrapperStyle={{ paddingBottom: 8 }}
          />
        )}
      </LineChart>
    </ResponsiveContainer>
  )
}
