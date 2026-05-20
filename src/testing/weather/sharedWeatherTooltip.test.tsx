import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import SharedWeatherTooltip from "../../components/weather/SharedWeatherTooltip"

describe("SharedWeatherTooltip", () => {
  it("renders nothing when inactive", () => {
    const { container } = render(<SharedWeatherTooltip active={false} />)

    expect(container).toBeEmptyDOMElement()
  })

  it("renders weather values from payload", () => {
    render(
      <SharedWeatherTooltip
        active={true}
        label={new Date("2026-05-20T10:00:00")}
        payload={[
          {
            payload: {
              temperature: 21.4,
              humidity: 65,
              precipitation: 0.5,
              windSpeed: 4.2,
              windDirection: 90,
              light: 12000,
            },
          },
        ]}
      />,
    )

    expect(screen.getByText("Temperatur")).toBeInTheDocument()
    expect(screen.getByText("21.4°C")).toBeInTheDocument()
    expect(screen.getByText("Luftfugtighed")).toBeInTheDocument()
    expect(screen.getByText("65%")).toBeInTheDocument()
    expect(screen.getByText("Vindretning")).toBeInTheDocument()
    expect(screen.getByText("E")).toBeInTheDocument()
  })

  it("ignores null and NaN values", () => {
    render(
      <SharedWeatherTooltip
        active={true}
        payload={[
          {
            payload: {
              temperature: Number.NaN,
              humidity: 65,
            },
          },
        ]}
      />,
    )

    expect(screen.queryByText("Temperatur")).not.toBeInTheDocument()
    expect(screen.getByText("Luftfugtighed")).toBeInTheDocument()
  })
})