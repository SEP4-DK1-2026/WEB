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

type FrontPageLineChartProps = {
  predictionData: PredictionData[]
  weatherData: WeatherData[]
  includeLegend?: boolean
  includeYticks?: boolean
}

type ChartPoint = {
  date: Date
  temperature: number
  series: "historical" | "prediction"
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

  const historicalSeries: ChartPoint[] = weatherData.map((d) => ({
    date: d.date,
    temperature: d.temperature,
    series: "historical",
  }))

  const predictionSeries: ChartPoint[] = predictionData.map((d) => ({
    date: d.predictedDate,
    temperature: d.temperature,
    series: "prediction",
  }))

  const combinedData = [...historicalSeries, ...predictionSeries].sort(
    (a, b) => a.date.getTime() - b.date.getTime(),
  )

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
        <CartesianGrid stroke="#aaa" strokeDasharray="5 5" />
        <Line
          type="monotone"
          dataKey={(d: ChartPoint) =>
            d.series === "historical" ? d.temperature : null
          }
          connectNulls
          stroke="red"
          strokeWidth={2}
          name="Målt temperatur"
        />
        <Line
          type="monotone"
          dataKey={(d: ChartPoint) =>
            d.series === "prediction" ? d.temperature : null
          }
          connectNulls
          stroke="blue"
          strokeWidth={2}
          name="Forudsagt temperatur"
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
