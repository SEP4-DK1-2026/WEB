import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import WeatherOverview from "../../components/weather/WeatherOverview"
import { currentWeather, predictedWeather } from "../testData/weatherTestData"

describe("WeatherOverview", () => {
  it("renders loading state", () => {
    render(
      <WeatherOverview
        currentWeather={null}
        predictedWeather={null}
        loading={true}
        error={null}
      />,
    )

    expect(screen.getByText("Indlæser vejrdata...")).toBeInTheDocument()
  })

  it("renders error state", () => {
    render(
      <WeatherOverview
        currentWeather={null}
        predictedWeather={null}
        loading={false}
        error="API fejl"
      />,
    )

    expect(screen.getByText("Der opstod en fejl.")).toBeInTheDocument()
    expect(screen.getByText("API fejl")).toBeInTheDocument()
  })

  it("renders empty state when data is missing", () => {
    render(
      <WeatherOverview
        currentWeather={null}
        predictedWeather={null}
        loading={false}
        error={null}
      />,
    )

    expect(screen.getByText("Ingen vejrdata fundet.")).toBeInTheDocument()
  })

  it("renders current and predicted weather cards", () => {
    render(
      <WeatherOverview
        currentWeather={currentWeather}
        predictedWeather={predictedWeather}
        loading={false}
        error={null}
      />,
    )

    expect(screen.getByTestId("weather-overview")).toBeInTheDocument()
    expect(screen.getByRole("heading", { name: "Nuværende vejr" })).toBeInTheDocument()
    expect(screen.getByRole("heading", { name: "Forventet vejr" })).toBeInTheDocument()
  })
})