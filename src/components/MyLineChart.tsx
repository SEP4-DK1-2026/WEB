import { RechartsDevtools } from "@recharts/devtools"
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts"
import type { WeatherData } from "../types/weatherData"

type MyLineChartProps = {
  data?: WeatherData[]
  includeAxes?: boolean
}

export default function MyLineChart({
  data,
  includeAxes = true,
}: MyLineChartProps) {
  return (
      <LineChart
        style={{ width: "100%", aspectRatio: 1.618, maxWidth: 600 }}
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
          stroke="purple"
          strokeWidth={2}
          name="Temperature"
        />
        {includeAxes && <XAxis dataKey="date" />}
        {includeAxes && (
          <YAxis
            width={"auto"}
            label={{ value: "Temperature", position: "insideLeft", angle: -90 }}
          />
        )}
        {includeAxes && <Legend align="right" />}
        <Tooltip />
        <RechartsDevtools />
      </LineChart>
  )
}
