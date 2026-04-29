import { type WeatherData } from "../../../types/weatherData"

export const BASE_URL = "https://example.com/api/weather"

// API returns unix time, but we want to convert to Date for work in TypeScript
type WeatherDataDto = Omit<WeatherData, "date"> & {
  unixTime: number
}

// IF BACKEND UNIX TIME IS IN SECONDS, MULTIPLY BY 1000 TO CONVERT TO MILLISECONDS
// OTHERWISE, DELETE * 1000 FROM FOLLOWING FUNCTION
function toWeatherData(dto: WeatherDataDto): WeatherData {
  const { unixTime, ...rest } = dto
  return {
    ...rest,
    date: new Date(unixTime * 1000),
  }
}

export async function getPrediction(
  hoursFromNow: number,
): Promise<WeatherData[]> {
  const result = await fetch(`${BASE_URL}/predict?hoursFromNow=${hoursFromNow}`)
  if (!result.ok) {
    throw new Error(`Failed to fetch weather prediction: ${result.statusText}`)
  }
  const data: WeatherDataDto[] = await result.json()
  return data.map(toWeatherData)
}

export async function getHistoricalData(
  startDate: number,
  endDate: number,
): Promise<WeatherData[]> {
  const result = await fetch(
    `${BASE_URL}/historical?startDate=${startDate}&endDate=${endDate}`,
  )
  if (!result.ok) {
    throw new Error(
      `Failed to fetch historical weather data: ${result.statusText}`,
    )
  }
  const data: WeatherDataDto[] = await result.json()
  return data.map(toWeatherData)
}

export async function getLast24Hours(): Promise<WeatherData[]> {
  //const endDate = Math.floor(Date.now() / 1000)
  const endDate = Math.floor(1776816000) // USE THIS WHEN USING MOCK API, OTHERWISE USE ONE ABOVE
  const startDate = endDate - 24 * 60 * 60

  return getHistoricalData(startDate, endDate)
}

export async function getCurrentWeather(): Promise<WeatherData> {
  const result = await fetch(`${BASE_URL}/current`)
  if (!result.ok) {
    throw new Error(
      `Failed to fetch current weather data: ${result.statusText}`,
    )
  }
  const data: WeatherDataDto = await result.json()
  return toWeatherData(data)
}
