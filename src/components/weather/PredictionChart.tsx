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
import type { PredictionData } from "../../types/weatherData"
import { formatDate, formatTime } from "../../utils/dateFormat"
import {
  formatWeatherTooltipLabel,
  formatWeatherTooltipValue,
} from "../../utils/chartTooltip"
import { scaleTimeSeriesData } from "../../utils/scaleTimeSeries"

type PredictionChartProps = {
  data: PredictionData[]
}

function getDateRangeLabel(
  values: PredictionData[],
  getDate: (value: PredictionData) => Date,
) {
  if (!values || values.length === 0) return "Date"

  let minDate = getDate(values[0])
  let maxDate = minDate

  for (const value of values) {
    const date = getDate(value)
    if (date.getTime() < minDate.getTime()) minDate = date
    if (date.getTime() > maxDate.getTime()) maxDate = date
  }

  const startDate = formatDate(minDate)
  const endDate = formatDate(maxDate)
  return startDate === endDate ? startDate : `${startDate} - ${endDate}`
}

export default function PredictionChart({ data }: PredictionChartProps) {
  const chartHeight = 240
  const dateRangeLabel = getDateRangeLabel(data, (value) => value.predictedDate)
  const scaledData = scaleTimeSeriesData(data, (value) => value.predictedDate)

  const common = (
    <>
      <CartesianGrid stroke="#aaa" strokeOpacity={0.3} />
      <XAxis
        dataKey="predictedDate"
        tickFormatter={formatTime}
        label={{
          value: dateRangeLabel,
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
        labelFormatter={formatWeatherTooltipLabel}
        formatter={formatWeatherTooltipValue}
      />
    </>
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
          data={scaledData}
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
          data={scaledData}
          syncId="anyId"
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          {common}
          <Bar
            dataKey="precipitation"
            fill="skyblue"
            activeBar={{ fill: "pink", stroke: "blue" }}
            radius={[5, 5, 0, 0]}
          />
          <Brush
            stroke="grey"
            fill="lightblue"
          />
          <RechartsDevtools />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
