import { useState } from "react"
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

export default function TimeSeriesWeatherCharts<T extends WeatherSeriesDatum>({
  data,
  getDate,
  chartHeight = 240,
}: TimeSeriesWeatherChartsProps<T>) {
  const [activeChart, setActiveChart] = useState<
    "temperature" | "humidity" | "precipitationWind" | null
  >(null)
  const scaledData = scaleTimeSeriesData(data, getDate)
  const dailyTicks = getDailyTicks(scaledData, getDate)

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
        tickMargin={10}
      />
    </>
  )

  return (
    <div className="space-y-6">
      <ResponsiveContainer width="100%" height={chartHeight}>
        <LineChart
          data={scaledData}
          syncId="anyId"
          onMouseEnter={() => setActiveChart("temperature")}
          onMouseLeave={() => setActiveChart(null)}
          margin={{
            top: 0,
            right: 60,
            left: 0,
            bottom: 0,
          }}
        >
          {commonAxis}
          <YAxis
            stroke="#64748b"
            tickFormatter={(value) =>
              formatWeatherAxisTickWhole(value, "temperature")
            }
            tickMargin={5}
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
              <span className="text-sm font-semibold text-slate-700">
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
          margin={{
            top: 0,
            right: 60,
            left: 0,
            bottom: 0,
          }}
        >
          {commonAxis}
          <YAxis
            stroke="#64748b"
            tickFormatter={(value) => formatWeatherAxisTick(value, "humidity")}
            tickMargin={5}
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
              <span className="text-sm font-semibold text-slate-700">
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
            tickFormatter={(value) =>
              formatWeatherAxisTickWhole(value, "precipitation")
            }
            allowDecimals={false}
            tickMargin={5}
          />
          <YAxis
            yAxisId="windSpeed"
            orientation="right"
            stroke="#64748b"
            tickFormatter={(value) =>
              formatWeatherAxisTickWhole(value, "windSpeed")
            }
            tickMargin={5}
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
              <span className="text-sm font-semibold text-slate-700">
                {value}
              </span>
            )}
            wrapperStyle={{ paddingBottom: 8, paddingRight: 60 }}
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
