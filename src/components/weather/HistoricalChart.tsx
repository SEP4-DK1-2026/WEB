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
  data: WeatherData[] // Replace with your actual data type
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

export default function HistoricalChart({ data }: HistoricalChartProps) {
  const getDateRangeLabel = () => {
    if (!data || data.length === 0) return "Date"
    const startDate = formatDate(data[0].date)
    const endDate = formatDate(data[data.length - 1].date)
    return startDate === endDate ? startDate : `${startDate} - ${endDate}`
  }

  return (
    <ResponsiveContainer width="100%" aspect={1.618} maxHeight={500}>
      <LineChart
        style={{
          maxHeight: "20vh",
        }}
        responsive
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

      <AreaChart
        style={{
          maxHeight: "20vh",
        }}
        responsive
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

      <BarChart
        style={{
          width: "100%",
          maxWidth: "700px",
          maxHeight: "20vh",
          aspectRatio: 1.618,
        }}
        responsive
        data={data}
        margin={{
          top: 5,
          right: 0,
          left: 0,
          bottom: 5,
        }}
      >
        
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
  )
}
