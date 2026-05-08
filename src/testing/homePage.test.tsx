import { afterEach, expect, test } from "vitest"
import { cleanup, render, screen, within } from "@testing-library/react"
import "@testing-library/jest-dom/vitest"
import HomePage from "../app/routes/HomePage"

afterEach(() => {
  cleanup()
})

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

  expect(
    await screen.findByRole("heading", { name: /Nuværende vejr/i }),
  ).toBeInTheDocument()

  expect(
    await screen.findByRole("heading", { name: /Forventet vejr/i }),
  ).toBeInTheDocument()
})

test("renders weather metric labels for both weather cards", async () => {
  render(<HomePage />)

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
  render(<HomePage />)

  await screen.findByRole("heading", { name: /Nuværende vejr/i })

  expect(screen.getAllByAltText(/Vejrikon/i)).toHaveLength(2)
})

// test("renders weather chart headings", async () => {
//   render(<HomePage />)

//   expect(
//     await screen.findByRole("heading", {
//       name: /Temperatur sidste 24 timer/i,
//     }),
//   ).toBeInTheDocument()

//   expect(
//     screen.getByRole("heading", {
//       name: /Temperatur næste 24 timer/i,
//     }),
//   ).toBeInTheDocument()
// })