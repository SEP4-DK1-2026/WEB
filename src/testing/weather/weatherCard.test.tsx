import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import WeatherCard from "../../components/weather/WeatherCard"
import { currentWeather } from "../testData/weatherTestData"

describe("WeatherCard", () => {
  it("renders title and weather metrics", () => {
    render(
      <WeatherCard
        title="Nuværende vejr"
        data={currentWeather}
        displayDate={currentWeather.date}
      />,
    )

    expect(screen.getByRole("heading", { name: "Nuværende vejr" })).toBeInTheDocument()
    expect(screen.getByText("Temperatur")).toBeInTheDocument()
    expect(screen.getByText("21°C")).toBeInTheDocument()
    expect(screen.getByText("Luftfugtighed")).toBeInTheDocument()
    expect(screen.getByText("65%")).toBeInTheDocument()
    expect(screen.getByText("Nedbør")).toBeInTheDocument()
    expect(screen.getByText("0.5 mm")).toBeInTheDocument()
    expect(screen.getByText("Vindhastighed")).toBeInTheDocument()
    expect(screen.getByText("4.2 m/s")).toBeInTheDocument()
    expect(screen.getByText("Vindretning")).toBeInTheDocument()
    expect(screen.getByText("E")).toBeInTheDocument()
    expect(screen.getByText("Lys")).toBeInTheDocument()
    expect(screen.getByText("12000 lx")).toBeInTheDocument()
  })

  it("renders optional tooltip text", () => {
    render(
      <WeatherCard
        title="Forventet vejr"
        data={currentWeather}
        displayDate={currentWeather.date}
        tooltipText="Tooltip test"
      />,
    )

    expect(screen.getByText("Tooltip test")).toBeInTheDocument()
  })

  it("renders weather icon", () => {
    render(
      <WeatherCard
        title="Nuværende vejr"
        data={currentWeather}
        displayDate={currentWeather.date}
      />,
    )

    expect(screen.getByAltText("Vejrikon")).toBeInTheDocument()
  })
})