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
import type { PredictionData, WeatherData } from "../../types/weatherData"
import { formatTime, formatDate } from "../../utils/dateFormat"
import {
  formatDate as formatDateTime,
  formatOneDecimal,
} from "../../utils/weatherFormatting"

type FrontPageLineChartProps = {
  predictionData: PredictionData[]
  weatherData: WeatherData[]
  includeLegend?: boolean
  includeYticks?: boolean
}

type ChartPoint = {
  date: Date
  historicalTemperature?: number
  predictionTemperature?: number
}

export default function FrontPageLineChart({
  predictionData,
  weatherData,
  includeLegend = true,
  includeYticks = true,
}: FrontPageLineChartProps) {
  const getDateRangeLabel = () => {
    if (!predictionData || predictionData.length === 0) return "Date"
    const startDate = formatDate(predictionData[0].predictedDate)
    const endDate = formatDate(
      predictionData[predictionData.length - 1].predictedDate,
    )
    return startDate === endDate ? startDate : `${startDate} - ${endDate}`
  }

  const pointsByTime = new Map<number, ChartPoint>()

  for (const entry of weatherData) {
    const key = entry.date.getTime()
    const existing = pointsByTime.get(key)

    pointsByTime.set(key, {
      date: entry.date,
      historicalTemperature: entry.temperature,
      predictionTemperature: existing?.predictionTemperature,
    })
  }

  for (const entry of predictionData) {
    const key = entry.predictedDate.getTime()
    const existing = pointsByTime.get(key)

    pointsByTime.set(key, {
      date: entry.predictedDate,
      historicalTemperature: existing?.historicalTemperature,
      predictionTemperature: entry.temperature,
    })
  }

  const combinedData = Array.from(pointsByTime.values()).sort(
    (a, b) => a.date.getTime() - b.date.getTime(),
  )

  const predictionStartMs = predictionData[0]?.predictedDate.getTime()
  const predictionEndMs =
    predictionData[predictionData.length - 1]?.predictedDate.getTime()

  const predictionTicks = predictionData.map((d) => d.predictedDate.getTime())

  return (
    <ResponsiveContainer width="100%" aspect={1.618} maxHeight={500}>
      <LineChart
        responsive
        data={combinedData}
        margin={{
          top: 20,
          right: 20,
          bottom: 5,
          left: 0,
        }}
      >
        <CartesianGrid stroke="#aaa" strokeOpacity={0.3} />
        <Line
          type="monotone"
          dataKey="historicalTemperature"
          stroke="red"
          strokeWidth={2}
          name="Målt temperatur"
        />
        <Line
          type="monotone"
          dataKey="predictionTemperature"
          stroke="blue"
          strokeWidth={2}
          name="Forudsagt temperatur"
        />

        <XAxis
          dataKey={(d: ChartPoint) => d.date.getTime()}
          type="number"
          scale="time"
          domain={[predictionStartMs, predictionEndMs]}
          ticks={predictionTicks}
          tickFormatter={(ms) => formatTime(new Date(ms))}
          interval={3}
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
        <Tooltip
          labelFormatter={(label) => formatDateTime(new Date(label))}
          formatter={(value, name) => [
            `${formatOneDecimal(Number(value))} °C`,
            name,
          ]}
        />

        <RechartsDevtools />
      </LineChart>
    </ResponsiveContainer>
  )
}
