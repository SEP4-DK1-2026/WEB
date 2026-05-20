import { render, screen } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"
import FrontPageLineChart from "../../components/weather/FrontPageChart"
import { currentWeather, predictedWeather } from "../testData/weatherTestData"

vi.mock("recharts", () => ({
  ResponsiveContainer: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="responsive-container">{children}</div>
  ),
  LineChart: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="line-chart">{children}</div>
  ),
  CartesianGrid: () => <div data-testid="cartesian-grid" />,
  Line: ({ name }: { name: string }) => <div>{name}</div>,
  XAxis: () => <div data-testid="x-axis" />,
  YAxis: () => <div data-testid="y-axis" />,
  Tooltip: () => <div data-testid="tooltip" />,
  Legend: () => <div data-testid="legend" />,
}))

describe("FrontPageLineChart", () => {
  it("renders chart with actual and predicted temperature lines", () => {
    render(
      <FrontPageLineChart
        weatherData={[currentWeather]}
        predictionData={[predictedWeather]}
      />,
    )

    expect(screen.getByTestId("responsive-container")).toBeInTheDocument()
    expect(screen.getByTestId("line-chart")).toBeInTheDocument()
    expect(screen.getByText("Målt temperatur")).toBeInTheDocument()
    expect(screen.getByText("Forudsagt temperatur")).toBeInTheDocument()
  })

  it("renders legend by default", () => {
    render(
      <FrontPageLineChart
        weatherData={[currentWeather]}
        predictionData={[predictedWeather]}
      />,
    )

    expect(screen.getByTestId("legend")).toBeInTheDocument()
  })

  it("can render without legend", () => {
    render(
      <FrontPageLineChart
        weatherData={[currentWeather]}
        predictionData={[predictedWeather]}
        includeLegend={false}
      />,
    )

    expect(screen.queryByTestId("legend")).not.toBeInTheDocument()
  })

  it("renders with empty historical data", () => {
    render(
      <FrontPageLineChart
        weatherData={[]}
        predictionData={[predictedWeather]}
      />,
    )

    expect(screen.getByTestId("line-chart")).toBeInTheDocument()
  })

  it("renders with empty prediction data", () => {
    render(
      <FrontPageLineChart
        weatherData={[currentWeather]}
        predictionData={[]}
      />,
    )

    expect(screen.getByTestId("line-chart")).toBeInTheDocument()
  })

  it("renders without y-axis tick labels when includeYticks is false", () => {
    render(
      <FrontPageLineChart
        weatherData={[currentWeather]}
        predictionData={[predictedWeather]}
        includeYticks={false}
      />,
    )

    expect(screen.getByTestId("y-axis")).toBeInTheDocument()
  })
})