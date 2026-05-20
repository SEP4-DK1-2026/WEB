import { render, screen } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"
import WeatherCharts from "../../components/weather/WeatherCharts"
import { currentWeather, predictedWeather } from "../testData/weatherTestData"

vi.mock("../../components/weather/FrontPageChart", () => ({
  default: () => <div data-testid="front-page-chart" />,
}))

describe("WeatherCharts", () => {
  it("does not render while loading", () => {
    const { container } = render(
      <WeatherCharts
        historicalData={[]}
        predictionData={[]}
        loading={true}
        error={null}
      />,
    )

    expect(container).toBeEmptyDOMElement()
  })

  it("does not render when there is an error", () => {
    const { container } = render(
      <WeatherCharts
        historicalData={[]}
        predictionData={[]}
        loading={false}
        error="API fejl"
      />,
    )

    expect(container).toBeEmptyDOMElement()
  })

  it("renders chart section when data is ready", () => {
    render(
      <WeatherCharts
        historicalData={[currentWeather]}
        predictionData={[predictedWeather]}
        loading={false}
        error={null}
      />,
    )

    expect(screen.getByLabelText("Temperaturgraf")).toBeInTheDocument()
    expect(screen.getByText("Prognose for de sidste og næste 24 timer")).toBeInTheDocument()
    expect(screen.getByTestId("front-page-chart")).toBeInTheDocument()
  })
})