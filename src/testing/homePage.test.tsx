import { expect, test } from "vitest"
import { render, screen, within } from "@testing-library/react"
import HomePage from "../app/routes/HomePage"

test("renders loading state before weather data is loaded", () => {
  render(<HomePage />)

  expect(screen.getByText(/Indlæser vejrdata/i)).toBeInTheDocument()
})

test("renders front page heading and description", () => {
  render(<HomePage />)

  expect(
    screen.getByRole("heading", { name: /Vejrudsigt/i }),
  ).toBeInTheDocument()

  expect(
    screen.getByText(/Her ses nuværende og fremtidig vejr/i),
  ).toBeInTheDocument()
})

test("renders current and predicted weather cards", async () => {
  render(<HomePage />)

  expect(await screen.findByText(/Nuværende vejr/i)).toBeInTheDocument()
  expect(await screen.findByText(/Forventet vejr/i)).toBeInTheDocument()
})

test("renders weather metric labels", async () => {
  render(<HomePage />)

  await screen.findByText(/Nuværende vejr/i)

  expect(screen.getAllByText(/Temperatur/i).length).toBeGreaterThan(0)
  expect(screen.getAllByText(/Luftfugtighed/i).length).toBeGreaterThan(0)
  expect(screen.getAllByText(/Nedbør/i).length).toBeGreaterThan(0)
  expect(screen.getAllByText(/Vindhastighed/i).length).toBeGreaterThan(0)
  expect(screen.getAllByText(/Vindretning/i).length).toBeGreaterThan(0)
  expect(screen.getAllByText(/Lys/i).length).toBeGreaterThan(0)
})

test("renders temperature charts", async () => {
  render(<HomePage />)

  expect(
    await screen.findByRole("heading", {
      name: /Temperatur sidste 24 timer/i,
    }),
  ).toBeInTheDocument()

  expect(
    screen.getByRole("heading", {
      name: /Temperatur næste 24 timer/i,
    }),
  ).toBeInTheDocument()
})

test("renders weather icons", async () => {
  render(<HomePage />)

  await screen.findByText(/Nuværende vejr/i)

  const icons = screen.getAllByAltText(/Vejrikon/i)

  expect(icons).toHaveLength(2)
})

test("current weather card contains expected labels", async () => {
  render(<HomePage />)

  const currentWeatherHeading = await screen.findByText(/Nuværende vejr/i)
  const currentWeatherCard = currentWeatherHeading.closest("div")

  expect(currentWeatherCard).not.toBeNull()

  expect(
    within(currentWeatherCard as HTMLElement).getByText(/Nuværende vejr/i),
  ).toBeInTheDocument()
})