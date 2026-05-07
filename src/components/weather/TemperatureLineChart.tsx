import { RechartsDevtools } from "@recharts/devtools"
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
import type { WeatherData } from "../../types/weatherData"
import { formatTime, formatDate } from "../../utils/dateFormat"

type TemperatureLineChartProps = {
  data?: WeatherData[]
  includeLegend?: boolean
  includeYticks?: boolean
}

export default function TemperatureLineChart({
  data,
  includeLegend = true,
  includeYticks = true,
}: TemperatureLineChartProps) {
  const getDateRangeLabel = () => {
    if (!data || data.length === 0) return "Date"
    const startDate = formatDate(data[0].date)
    const endDate = formatDate(data[data.length - 1].date)
    return startDate === endDate ? startDate : `${startDate} - ${endDate}`
  }

  return (
    <ResponsiveContainer width="100%" aspect={1.618} maxHeight={500}>
      <LineChart
        responsive
        data={data}
        margin={{
          top: 20,
          right: 20,
          bottom: 5,
          left: 0,
        }}
      >
        <CartesianGrid stroke="#aaa" strokeDasharray="5 5" />
        <Line
          type="monotone"
          dataKey="temperature"
          stroke="red"
          strokeWidth={2}
          name="Temperatur"
        />
        <XAxis
          dataKey="date"
          tickFormatter={formatTime}
          label={{
            value: getDateRangeLabel(),
            position: "insideBottom",
            offset: -5,
          }}
        />

        <YAxis
          width={50}
          tickLine={includeYticks}
          tickFormatter={includeYticks ? undefined : () => ""}
        />
        {includeLegend && <Legend align="right" />}
        <Tooltip />
        <RechartsDevtools />
      </LineChart>
    </ResponsiveContainer>
  )
}