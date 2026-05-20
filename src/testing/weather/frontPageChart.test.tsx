// src/testing/weather/frontPageChart.test.tsx

import { render, screen } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"
import type { ReactNode } from "react"
import FrontPageLineChart from "../../components/weather/FrontPageChart"
import { currentWeather, predictedWeather } from "../testData/weatherTestData"

vi.mock("recharts", () => ({
  ResponsiveContainer: ({ children }: { children: ReactNode }) => (
    <div data-testid="responsive-container">{children}</div>
  ),

  LineChart: ({
    children,
    data,
  }: {
    children: ReactNode
    data: Array<Record<string, unknown>>
  }) => (
    <div data-testid="line-chart">
      <div data-testid="chart-data-count">{data.length}</div>
      {children}
    </div>
  ),

  CartesianGrid: () => <div data-testid="cartesian-grid" />,

  Line: ({ name, dataKey }: { name: string; dataKey: string }) => (
    <div data-testid={`line-${dataKey}`}>{name}</div>
  ),

  XAxis: ({
    dataKey,
    ticks,
    tick,
  }: {
    dataKey: (entry: { date: Date }) => number
    ticks?: number[]
    tick?: ReactNode
  }) => (
    <div data-testid="x-axis">
      <span data-testid="x-axis-value">
        {dataKey({ date: new Date("2026-05-20T10:00:00") })}
      </span>
      <span data-testid="x-axis-ticks">{ticks?.length ?? 0}</span>
      {tick}
    </div>
  ),

  YAxis: ({
    tickFormatter,
    tickLine,
  }: {
    tickFormatter: (value: number) => string
    tickLine: boolean
  }) => (
    <div data-testid="y-axis">
      <span data-testid="y-axis-formatted">{tickFormatter(21.6)}</span>
      <span data-testid="y-axis-tick-line">{String(tickLine)}</span>
    </div>
  ),

  Tooltip: ({ content }: { content: ReactNode }) => (
    <div data-testid="tooltip">{content}</div>
  ),

  Legend: ({
    formatter,
  }: {
    formatter: (value: string) => ReactNode
  }) => (
    <div data-testid="legend">
      {formatter("Målt temperatur")}
    </div>
  ),
}))

describe("FrontPageLineChart", () => {
  it("renders actual and predicted temperature lines", () => {
    render(
      <FrontPageLineChart
        weatherData={[currentWeather]}
        predictionData={[predictedWeather]}
      />,
    )

    expect(screen.getByTestId("responsive-container")).toBeInTheDocument()
   expect(screen.getByTestId("line-actualTemperature")).toHaveTextContent(
  "Målt temperatur",
)

expect(screen.getByTestId("line-predictedTemperature")).toHaveTextContent(
  "Forudsagt temperatur",
)
  })

  it("builds chart data from weather and prediction data", () => {
    render(
      <FrontPageLineChart
        weatherData={[currentWeather]}
        predictionData={[predictedWeather]}
      />,
    )

    expect(screen.getByTestId("chart-data-count")).toHaveTextContent("2")
  })

  it("formats y-axis ticks when enabled", () => {
    render(
      <FrontPageLineChart
        weatherData={[currentWeather]}
        predictionData={[predictedWeather]}
        includeYticks={true}
      />,
    )

    expect(screen.getByTestId("y-axis-formatted")).toHaveTextContent("22°C")
    expect(screen.getByTestId("y-axis-tick-line")).toHaveTextContent("true")
  })

  it("hides y-axis tick labels when disabled", () => {
    render(
      <FrontPageLineChart
        weatherData={[currentWeather]}
        predictionData={[predictedWeather]}
        includeYticks={false}
      />,
    )

    expect(screen.getByTestId("y-axis-formatted")).toHaveTextContent("")
    expect(screen.getByTestId("y-axis-tick-line")).toHaveTextContent("false")
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

  it("does not render legend when includeLegend is false", () => {
    render(
      <FrontPageLineChart
        weatherData={[currentWeather]}
        predictionData={[predictedWeather]}
        includeLegend={false}
      />,
    )

    expect(screen.queryByTestId("legend")).not.toBeInTheDocument()
  })

  it("renders with only prediction data", () => {
    render(
      <FrontPageLineChart
        weatherData={[]}
        predictionData={[predictedWeather]}
      />,
    )

    expect(screen.getByTestId("chart-data-count")).toHaveTextContent("1")
    expect(screen.getByText("Forudsagt temperatur")).toBeInTheDocument()
  })

  it("renders with only historical data", () => {
    render(
      <FrontPageLineChart
        weatherData={[currentWeather]}
        predictionData={[]}
      />,
    )

    expect(screen.getByTestId("chart-data-count")).toHaveTextContent("1")
   expect(screen.getByTestId("line-actualTemperature")).toHaveTextContent(
  "Målt temperatur",
)
  })

  it("renders with no data", () => {
    render(<FrontPageLineChart weatherData={[]} predictionData={[]} />)

    expect(screen.getByTestId("chart-data-count")).toHaveTextContent("0")
  })
})