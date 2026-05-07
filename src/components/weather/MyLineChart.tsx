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
import { formatTime } from "../../utils/dateFormat"

type MyLineChartProps = {
  data?: WeatherData[]
  includeAxes?: boolean
}

export default function MyLineChart({
  data,
  includeAxes = true,
}: MyLineChartProps) {
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
        {includeAxes && <CartesianGrid stroke="#aaa" strokeDasharray="5 5" />}
        <Line
          type="monotone"
          dataKey="temperature"
          stroke="red"
          strokeWidth={2}
          name="Temperatur"
        />
        {includeAxes && <XAxis dataKey="date" tickFormatter={formatTime} />}
        {includeAxes && (
          <YAxis
            width={50}
            //label={{ value: "Temperature", position: "insideLeft", angle: -90 }}
          />
        )}
        {includeAxes && <Legend align="right" />}
        <Tooltip />
        <RechartsDevtools />
      </LineChart>
    </ResponsiveContainer>
  )
}
