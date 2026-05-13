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
import { formatDate, formatTime } from "../../utils/dateFormat"

type HistoricalChartProps = {
  data: WeatherData[]
}

export default function HistoricalChart({ data }: HistoricalChartProps) {
  const chartHeight = 240

  const getDateRangeLabel = () => {
    if (!data || data.length === 0) return "Date"
    const startDate = formatDate(data[0].date)
    const endDate = formatDate(data[data.length - 1].date)
    return startDate === endDate ? startDate : `${startDate} - ${endDate}`
  }

  const common = (
    <>
      <CartesianGrid stroke="#aaa" strokeOpacity={0.3} />
      <XAxis
        dataKey="date"
        tickFormatter={formatTime}
        label={{
          value: getDateRangeLabel(),
          position: "insideBottom",
          offset: -5,
        }}
      />
      <YAxis stroke="var(--color-text-3)" />
      <Tooltip
        cursor={{ stroke: "var(--color-border-2)" }}
        contentStyle={{
          backgroundColor: "var(--color-surface-base)",
          borderColor: "var(--color-border-2)",
        }}
      />
    </>
  )

  return (
    <div className="space-y-6">
      <ResponsiveContainer width="100%" height={chartHeight}>
        <LineChart
          data={data}
          syncId="anyId"
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          {common}
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
          data={data}
          syncId="anyId"
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          {common}
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
          data={data}
          margin={{
            top: 5,
            right: 0,
            left: 0,
            bottom: 5,
          }}
        >
          {common}
          <Bar
            dataKey="precipitation"
            fill="#8884d8"
            activeBar={{ fill: "pink", stroke: "blue" }}
            radius={[10, 10, 0, 0]}
          />
          <Brush
            stroke="var(--color-border-1)"
            fill="var(--color-surface-base)"
          />
          <RechartsDevtools />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
