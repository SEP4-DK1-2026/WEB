import { render, screen, fireEvent } from "@testing-library/react"
import { describe, expect, it, beforeEach } from "vitest"
import {
  WeatherModelProvider,
  useWeatherModel,
} from "../../context/WeatherModelContext"

function TestComponent() {
  const { modelName, setModelName } = useWeatherModel()

  return (
    <>
      <p data-testid="model-name">{modelName}</p>
      <button onClick={() => setModelName("VIA")}>Set VIA</button>
    </>
  )
}

describe("WeatherModelContext", () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it("uses DMI as default model", () => {
    render(
      <WeatherModelProvider>
        <TestComponent />
      </WeatherModelProvider>,
    )

    expect(screen.getByTestId("model-name")).toHaveTextContent("DMI")
  })

  it("uses saved model from localStorage", () => {
    localStorage.setItem("weatherModel", "VIA")

    render(
      <WeatherModelProvider>
        <TestComponent />
      </WeatherModelProvider>,
    )

    expect(screen.getByTestId("model-name")).toHaveTextContent("VIA")
  })

  it("falls back to DMI when localStorage value is invalid", () => {
    localStorage.setItem("weatherModel", "INVALID")

    render(
      <WeatherModelProvider>
        <TestComponent />
      </WeatherModelProvider>,
    )

    expect(screen.getByTestId("model-name")).toHaveTextContent("DMI")
  })

  it("updates model and saves it in localStorage", () => {
    render(
      <WeatherModelProvider>
        <TestComponent />
      </WeatherModelProvider>,
    )

    fireEvent.click(screen.getByRole("button", { name: "Set VIA" }))

    expect(screen.getByTestId("model-name")).toHaveTextContent("VIA")
    expect(localStorage.getItem("weatherModel")).toBe("VIA")
  })

  it("throws error when hook is used outside provider", () => {
    expect(() => render(<TestComponent />)).toThrow(
      "useWeatherModel must be used inside WeatherModelProvider",
    )
  })
})