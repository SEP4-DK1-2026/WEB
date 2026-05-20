import { render, screen } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"
import HistoricalChart from "../../components/weather/HistoricalChart"
import PredictionChart from "../../components/weather/PredictionChart"
import { currentWeather, predictedWeather } from "../testData/weatherTestData"

vi.mock("../../components/weather/TimeSeriesWeatherCharts", () => ({
  default: () => <div data-testid="time-series-weather-charts" />,
}))

describe("weather chart wrappers", () => {
  it("renders historical chart", () => {
    render(<HistoricalChart data={[currentWeather]} />)

    expect(screen.getByTestId("time-series-weather-charts")).toBeInTheDocument()
  })

  it("renders prediction chart", () => {
    render(<PredictionChart data={[predictedWeather]} />)

    expect(screen.getByTestId("time-series-weather-charts")).toBeInTheDocument()
  })
})