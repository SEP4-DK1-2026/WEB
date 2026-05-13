import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  Brush,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { RechartsDevtools } from "@recharts/devtools"
import type { WeatherData } from "../../types/weatherData"
import { formatTime } from "../../utils/dateFormat"
import {
  formatWeatherTooltipLabel,
  formatWeatherTooltipValue,
  formatWeatherAxisTick,
} from "../../utils/chartTooltip"
import { scaleTimeSeriesData } from "../../utils/scaleTimeSeries"

type HistoricalChartProps = {
  data: WeatherData[]
}

export default function HistoricalChart({ data }: HistoricalChartProps) {
  const chartHeight = 240
  const scaledData = scaleTimeSeriesData(data, (value) => value.date)

  const commonAxis = (
    <>
      <CartesianGrid stroke="#aaa" strokeOpacity={0.3} />
      <XAxis dataKey="date" tickFormatter={formatTime} />
    </>
  )

  const sharedTooltip = (
    <Tooltip
      cursor={{ stroke: "var(--color-border-2)" }}
      contentStyle={{
        backgroundColor: "var(--color-surface-base)",
        borderColor: "var(--color-border-2)",
      }}
      labelFormatter={formatWeatherTooltipLabel}
      formatter={formatWeatherTooltipValue}
    />
  )

  return (
    <div className="space-y-6">
      <ResponsiveContainer width="100%" height={chartHeight}>
        <LineChart
          data={scaledData}
          syncId="anyId"
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          {commonAxis}
          <YAxis
            stroke="var(--color-text-3)"
            tickFormatter={(value) =>
              formatWeatherAxisTick(value, "temperature")
            }
          />
          {sharedTooltip}
          <Line
            type="monotone"
            dataKey="temperature"
            stroke="red"
            fill="red"
            activeDot={{
              stroke: "black",
            }}
          />
          <RechartsDevtools />
        </LineChart>
      </ResponsiveContainer>

      <ResponsiveContainer width="100%" height={chartHeight}>
        <AreaChart
          data={scaledData}
          syncId="anyId"
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          {commonAxis}
          <YAxis
            stroke="var(--color-text-3)"
            tickFormatter={(value) => formatWeatherAxisTick(value, "humidity")}
          />
          {sharedTooltip}
          <Area
            type="monotone"
            dataKey="humidity"
            stroke="green"
            fill="green"
            activeDot={{
              stroke: "black",
            }}
          />
          <RechartsDevtools />
        </AreaChart>
      </ResponsiveContainer>

      <ResponsiveContainer width="100%" height={chartHeight}>
        <BarChart
          data={scaledData}
          syncId="anyId"
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          {commonAxis}
          <YAxis
            stroke="var(--color-text-3)"
            tickFormatter={(value) =>
              formatWeatherAxisTick(value, "precipitation")
            }
          />
          {sharedTooltip}
          <Bar
            dataKey="precipitation"
            fill="skyblue"
            activeBar={{ fill: "pink", stroke: "blue" }}
            radius={[5, 5, 0, 0]}
          />
          <Brush stroke="grey" fill="lightblue" />
          <RechartsDevtools />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
