import type { WeatherData } from "../../types/weatherData"
import TimeSeriesWeatherCharts from "./TimeSeriesWeatherCharts"

type HistoricalChartProps = {
  data: WeatherData[]
}

export default function HistoricalChart({ data }: HistoricalChartProps) {
  return <TimeSeriesWeatherCharts data={data} getDate={(value) => value.date} />
}
