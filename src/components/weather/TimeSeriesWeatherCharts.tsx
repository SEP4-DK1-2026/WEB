import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { RechartsDevtools } from "@recharts/devtools"
import { formatDateNoYear } from "../../utils/dateFormat"
import {
  formatWeatherAxisTick,
  formatWeatherAxisTickWhole,
} from "../../utils/chartTooltip"
import { getDailyTicks } from "../../utils/chartTicks"
import { scaleTimeSeriesData } from "../../utils/scaleTimeSeries"
import SharedWeatherTooltip from "./SharedWeatherTooltip"

type WeatherSeriesDatum = {
  temperature: number
  humidity: number
  precipitation: number
}

type TimeSeriesWeatherChartsProps<T extends WeatherSeriesDatum> = {
  data: T[]
  getDate: (entry: T) => Date
  chartHeight?: number
}

export default function TimeSeriesWeatherCharts<T extends WeatherSeriesDatum>({
  data,
  getDate,
  chartHeight = 240,
}: TimeSeriesWeatherChartsProps<T>) {
  const scaledData = scaleTimeSeriesData(data, getDate)
  const dailyTicks = getDailyTicks(scaledData, getDate)

  const commonAxis = (
    <>
      <CartesianGrid stroke="#aaa" strokeOpacity={0.3} />
      <XAxis
        dataKey={(entry: T) => getDate(entry).getTime()}
        type="number"
        scale="time"
        tickFormatter={formatDateNoYear}
        ticks={dailyTicks}
        interval="preserveStartEnd"
        minTickGap={24}
        tickMargin={10}
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
          {commonAxis}
          <YAxis
            stroke="#64748b"
            tickFormatter={(value) =>
              formatWeatherAxisTickWhole(value, "temperature")
            }
          />
          <Tooltip
            cursor={{ stroke: "#bfdbfe" }}
            content={<SharedWeatherTooltip />}
          />
          <Legend
            verticalAlign="top"
            align="right"
            formatter={(value) => (
              <span className="text-sm font-semibold text-slate-700">
                {value}
              </span>
            )}
            wrapperStyle={{ paddingBottom: 8 }}
          />
          <Line
            type="monotone"
            dataKey="temperature"
            name="Temperatur"
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
            stroke="#64748b"
            tickFormatter={(value) => formatWeatherAxisTick(value, "humidity")}
          />
          <Tooltip
            content={<SharedWeatherTooltip />}
            cursor={false}
            wrapperStyle={{ display: "none" }}
          />
          <Legend
            verticalAlign="top"
            align="right"
            formatter={(value) => (
              <span className="text-sm font-semibold text-slate-700">
                {value}
              </span>
            )}
            wrapperStyle={{ paddingBottom: 8 }}
          />
          <Area
            type="monotone"
            dataKey="humidity"
            name="Luftfugtighed"
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
            stroke="#64748b"
            tickFormatter={(value) =>
              formatWeatherAxisTickWhole(value, "precipitation")
            }
          />
          <Tooltip
            content={<SharedWeatherTooltip />}
            cursor={false}
            wrapperStyle={{ display: "none" }}
          />
          <Legend
            verticalAlign="top"
            align="right"
            formatter={(value) => (
              <span className="text-sm font-semibold text-slate-700">
                {value}
              </span>
            )}
            wrapperStyle={{ paddingBottom: 8 }}
          />
          <Bar
            dataKey={(entry: T) =>
              entry.precipitation >= 0.1 ? entry.precipitation : null
            }
            name="Nedbør"
            fill="skyblue"
            activeBar={{ fill: "pink", stroke: "blue" }}
            radius={[5, 5, 0, 0]}
          />
          <RechartsDevtools />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
