import { type PredictionData, type WeatherData } from "../../../types/weatherData"

export const BASE_URL = "sep4-web-microservice-cxb7cvhvdpgdedfs.swedencentral-01.azurewebsites.net/api"

// API returns unix time, but we want to convert to Date for work in TypeScript
type WeatherDataDto = Omit<WeatherData, "date"> & {
  time: number // unix time in seconds
}

type PredictionDataDto = Omit<PredictionData, "predictedDate"> & {
  predictedTime: number // unix time in seconds
}

// IF BACKEND UNIX TIME IS IN SECONDS, MULTIPLY BY 1000 TO CONVERT TO MILLISECONDS
// OTHERWISE, DELETE * 1000 FROM FOLLOWING FUNCTION
function toWeatherData(dto: WeatherDataDto): WeatherData {
  const { time, ...rest } = dto
  return {
    ...rest,
    date: new Date(time * 1000),
  }
}

function toPredictionData(dto: PredictionDataDto): PredictionData {
  const { predictedTime, ...rest } = dto
  return {
    ...rest,
    predictedDate: new Date(predictedTime * 1000)
  }
}

export async function getPrediction(
  hoursFromNow: number,
): Promise<PredictionData[]> {
  const result = await fetch(`${BASE_URL}/getPredictionsNextHours?hoursFromNow=${hoursFromNow}`)
  if (!result.ok) {
    throw new Error(`Failed to fetch weather prediction: ${result.statusText}`)
  }
  const data: PredictionDataDto[] = await result.json()
  return data.map(toPredictionData)
}

/** Takes unix timestamps in seconds */
export async function getPredictionsInRange(
  startDate: number,
  endDate: number,
): Promise<PredictionData[]> {
  const result = await fetch(
    `${BASE_URL}/getPredictionsInRange?startDate=${startDate}&endDate=${endDate}`,
  )
  if (!result.ok) {
    throw new Error(`Failed to fetch weather predictions in range: ${result.statusText}`)
  }
  const data: PredictionDataDto[] = await result.json()
  return data.map(toPredictionData)
}

export async function getPredictionsInRangeUsingDates(
  startDate: Date,
  endDate: Date
): Promise<PredictionData[]> {
  const startTimestamp = Math.floor(startDate.getTime() / 1000)
  const endTimestamp = Math.floor(endDate.getTime() / 1000)

  return getPredictionsInRange(startTimestamp, endTimestamp)
}

// Maybe add InRange to name
/** Takes unix timestamps in seconds */
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

export async function getHistoricalDataUsingDates(
  startDate: Date,
  endDate: Date
): Promise<WeatherData[]> {
  const startTimestamp = Math.floor(startDate.getTime() / 1000)
  const endTimestamp = Math.floor(endDate.getTime() / 1000)

  return getHistoricalData(startTimestamp, endTimestamp)
}

// Helper function
export async function getLast24Hours(): Promise<WeatherData[]> {
  const endDate = Math.floor(Date.now() / 1000)
  const startDate = endDate - 24 * 60 * 60

  return getHistoricalData(startDate, endDate)
}

export async function getCurrentWeather(): Promise<WeatherData> {
  const result = await fetch(`${BASE_URL}/getLatestWeather`)
  if (!result.ok) {
    throw new Error(
      `Failed to fetch current weather data: ${result.statusText}`,
    )
  }
  const data: WeatherDataDto = await result.json()
  return toWeatherData(data)
}
