import type { PredictionData } from "../../types/weatherData"
import TimeSeriesWeatherCharts from "./TimeSeriesWeatherCharts"

type PredictionChartProps = {
  data: PredictionData[]
}

export default function PredictionChart({ data }: PredictionChartProps) {
  return (
    <TimeSeriesWeatherCharts
      data={data}
      getDate={(value) => value.predictedDate}
    />
  )
}
