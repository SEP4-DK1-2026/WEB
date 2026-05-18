import { useEffect, useState } from "react"
import {
  Area,
  AreaChart,
  Bar,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { formatDateNoYear } from "../../utils/dateFormat"
import {
  formatWeatherAxisTick,
  formatWeatherAxisTickWhole,
} from "../../utils/chartTooltip"
import { getDailyTicks } from "../../utils/chartTicks"
import { scaleTimeSeriesData } from "../../utils/scaleTimeSeries"
import SharedWeatherTooltip from "./SharedWeatherTooltip"

type WeatherSeriesDatum = {
  temperature: number
  humidity: number
  precipitation: number
  windSpeed: number
}

type TimeSeriesWeatherChartsProps<T extends WeatherSeriesDatum> = {
  data: T[]
  getDate: (entry: T) => Date
  chartHeight?: number
}

const SMALL_SCREEN_QUERY = "(max-width: 640px)"

export default function TimeSeriesWeatherCharts<T extends WeatherSeriesDatum>({
  data,
  getDate,
  chartHeight = 240,
}: TimeSeriesWeatherChartsProps<T>) {
  const [activeChart, setActiveChart] = useState<
    "temperature" | "humidity" | "precipitationWind" | null
  >(null)
  const [isSmallScreen, setIsSmallScreen] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined") return

    const mediaQuery = window.matchMedia(SMALL_SCREEN_QUERY)
    const handleChange = (event: MediaQueryListEvent) =>
      setIsSmallScreen(event.matches)

    setIsSmallScreen(mediaQuery.matches)

    if (!mediaQuery.addEventListener) return

    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])
  const scaledData = scaleTimeSeriesData(data, getDate)
  const dailyTicks = getDailyTicks(scaledData, getDate)

  const yAxisTickSize = isSmallScreen ? 10 : 12
  const yAxisWidth = isSmallScreen ? 36 : 60
  const yAxisTickMargin = isSmallScreen ? 2 : 5
  const xAxisTick = isSmallScreen
    ? { fill: "#64748b", fontSize: 12 }
    : undefined
  const chartMargin = {
    top: 0,
    right: yAxisWidth,
    left: 0,
    bottom: 0,
  }
  const composedLegendPadding = isSmallScreen
    ? { paddingBottom: 8, paddingRight: yAxisWidth }
    : { paddingBottom: 8, paddingRight: 60 }

  const commonAxis = (
    <>
      <CartesianGrid stroke="#aaa" strokeOpacity={0.2} />
      <XAxis
        dataKey={(entry: T) => getDate(entry).getTime()}
        type="number"
        scale="time"
        tickFormatter={formatDateNoYear}
        ticks={dailyTicks}
        interval="preserveStartEnd"
        minTickGap={24}
        tick={xAxisTick}
        tickMargin={10}
      />
    </>
  )

  return (
    <div className="space-y-4 sm:space-y-6">
      <ResponsiveContainer width="100%" height={chartHeight}>
        <LineChart
          data={scaledData}
          syncId="anyId"
          onMouseEnter={() => setActiveChart("temperature")}
          onMouseLeave={() => setActiveChart(null)}
          margin={chartMargin}
        >
          {commonAxis}
          <YAxis
            stroke="#64748b"
            tick={{ fill: "#64748b", fontSize: yAxisTickSize }}
            width={yAxisWidth}
            tickFormatter={(value) =>
              formatWeatherAxisTickWhole(value, "temperature")
            }
            tickMargin={yAxisTickMargin}
          />
          <Tooltip
            cursor={{ stroke: "#bfdbfe" }}
            content={<SharedWeatherTooltip />}
            active={activeChart === "temperature"}
          />
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
          <Line
            type="monotone"
            dataKey="temperature"
            name="Temperatur"
            stroke="red"
            strokeWidth={2}
            dot={false}
            activeDot={{
              stroke: "black",
            }}
          />
        </LineChart>
      </ResponsiveContainer>

      <ResponsiveContainer width="100%" height={chartHeight}>
        <AreaChart
          data={scaledData}
          syncId="anyId"
          onMouseEnter={() => setActiveChart("humidity")}
          onMouseLeave={() => setActiveChart(null)}
          margin={chartMargin}
        >
          {commonAxis}
          <YAxis
            stroke="#64748b"
            tick={{ fill: "#64748b", fontSize: yAxisTickSize }}
            width={yAxisWidth}
            tickFormatter={(value) => formatWeatherAxisTick(value, "humidity")}
            tickMargin={yAxisTickMargin}
            domain={[0, 100]}
          />
          <Tooltip
            content={<SharedWeatherTooltip />}
            cursor={false}
            active={activeChart === "humidity"}
          />
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
          <Area
            type="monotone"
            dataKey="humidity"
            name="Luftfugtighed"
            stroke="green"
            fill="green"
            activeDot={{
              stroke: "black",
            }}
          />
        </AreaChart>
      </ResponsiveContainer>

      <ResponsiveContainer width="100%" height={chartHeight}>
        <ComposedChart
          data={scaledData}
          syncId="anyId"
          onMouseEnter={() => setActiveChart("precipitationWind")}
          onMouseLeave={() => setActiveChart(null)}
          barGap={0}
          barCategoryGap={0}
          margin={{
            top: 0,
            right: 0,
            left: 0,
            bottom: 0,
          }}
        >
          {commonAxis}
          <YAxis
            yAxisId="precipitation"
            stroke="#64748b"
            tick={{ fill: "#64748b", fontSize: yAxisTickSize }}
            width={yAxisWidth}
            tickFormatter={(value) =>
              formatWeatherAxisTickWhole(value, "precipitation")
            }
            allowDecimals={false}
            tickMargin={yAxisTickMargin}
          />
          <YAxis
            yAxisId="windSpeed"
            orientation="right"
            stroke="#64748b"
            tick={{ fill: "#64748b", fontSize: yAxisTickSize }}
            width={yAxisWidth}
            tickFormatter={(value) =>
              formatWeatherAxisTickWhole(value, "windSpeed")
            }
            tickMargin={yAxisTickMargin}
          />
          <Tooltip
            content={<SharedWeatherTooltip />}
            cursor={false}
            active={activeChart === "precipitationWind"}
          />
          <Legend
            verticalAlign="top"
            align="right"
            formatter={(value) => (
              <span className="text-xs sm:text-sm font-semibold text-slate-700">
                {value}
              </span>
            )}
            wrapperStyle={composedLegendPadding}
          />
          <Bar
            dataKey={(entry: T) =>
              entry.precipitation >= 0.1 ? entry.precipitation : null
            }
            name="Nedbør"
            fill="skyblue"
            activeBar={{ fill: "lightgrey", stroke: "skyblue" }}
            radius={[1, 1, 0, 0]}
            yAxisId="precipitation"
          />
          <Line
            type="monotone"
            dataKey="windSpeed"
            name="Vindhastighed"
            stroke="#0f766e"
            strokeWidth={2}
            dot={false}
            activeDot={{ stroke: "black" }}
            yAxisId="windSpeed"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
}
