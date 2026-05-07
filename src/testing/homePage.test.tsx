import { expect, test } from "vitest"
import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom/vitest"
import HomePage from "../app/routes/HomePage"

test("renders front page weather content", async () => {
  render(<HomePage />)

  expect(
    screen.getByText(/Indlæser vejrdata/i),
  ).toBeInTheDocument()

  expect(
    await screen.findByRole("heading", { name: /Vejrudsigt/i }),
  ).toBeInTheDocument()

  expect(
    await screen.findByText(/Nuværende vejr/i),
  ).toBeInTheDocument()

  expect(
    await screen.findByText(/Forventet vejr/i),
  ).toBeInTheDocument()
})