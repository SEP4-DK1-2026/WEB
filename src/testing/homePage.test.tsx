import { afterEach, expect, test } from "vitest"
import { cleanup, render, screen, within } from "@testing-library/react"
import "@testing-library/jest-dom/vitest"
import HomePage from "../app/routes/HomePage"
import { WeatherModelProvider } from "../context/WeatherModelContext"

afterEach(() => {
  cleanup()
  localStorage.clear()
})

function renderHomePage() {
  return render(
    <WeatherModelProvider>
      <HomePage />
    </WeatherModelProvider>,
  )
}

test("renders loading state before weather data is loaded", () => {
  renderHomePage()

  expect(screen.getByText(/Indlæser vejrdata/i)).toBeInTheDocument()
})

test("renders current and predicted weather cards", async () => {
  renderHomePage()

  expect(
    await screen.findByRole("heading", { name: /Nuværende vejr/i }),
  ).toBeInTheDocument()

  expect(
    await screen.findByRole("heading", { name: /Forventet vejr/i }),
  ).toBeInTheDocument()
})

test("renders weather metric labels for both weather cards", async () => {
  renderHomePage()

  await screen.findByRole("heading", { name: /Nuværende vejr/i })

  const overview = screen.getByTestId("weather-overview")

  expect(within(overview).getAllByText(/Temperatur/i)).toHaveLength(2)
  expect(within(overview).getAllByText(/Luftfugtighed/i)).toHaveLength(2)
  expect(within(overview).getAllByText(/Nedbør/i)).toHaveLength(2)
  expect(within(overview).getAllByText(/Vindhastighed/i)).toHaveLength(2)
  expect(within(overview).getAllByText(/Vindretning/i)).toHaveLength(2)
  expect(within(overview).getAllByText(/Lys/i)).toHaveLength(2)
})

test("renders weather icons for both weather cards", async () => {
  renderHomePage()

  await screen.findByRole("heading", { name: /Nuværende vejr/i })

  expect(screen.getAllByAltText(/Vejrikon/i)).toHaveLength(2)
})