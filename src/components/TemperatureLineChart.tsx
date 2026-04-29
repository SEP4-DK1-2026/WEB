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
import type { WeatherData } from "../types/weatherData"

type TemperatureLineChartProps = {
  data?: WeatherData[]
  includeAxes?: boolean
  includeLegend?: boolean
}

export default function TemperatureLineChart({
  data,
  includeAxes = true,
  includeLegend = true,
}: TemperatureLineChartProps) {
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
        <XAxis dataKey="date" />
        {includeAxes && (
          <YAxis
            width={50}
            //label={{ value: "Temperature", position: "insideLeft", angle: -90 }}
          />
        )}
        {includeLegend && <Legend align="right" />}
        <Tooltip />
        <RechartsDevtools />
      </LineChart>
    </ResponsiveContainer>
  )
}
