import {
  type PredictionData,
  type WeatherData,
} from "../../../types/weatherData"

export const BASE_URL =
  "http://localhost:7071/api"

// API returns unix time, but we want to convert to Date for work in TypeScript
type WeatherDataDto = Omit<WeatherData, "date"> & {
  time: number // unix time in seconds
}

type WeatherModel ="DMI" | "VIA"

type PredictionDataDto = Omit<PredictionData, "predictedDate"> & {
  predictedTime: number // unix time in seconds
}

// IF BACKEND UNIX TIME IS IN SECONDS, MULTIPLY BY 1000 TO CONVERT TO MILLISECONDS
// OTHERWISE, DELETE * 1000 FROM FOLLOWING FUNCTION
function toWeatherData(dto: WeatherDataDto): WeatherData {
  const { time, ...rest } = dto
  return {
    ...rest,
    humidity: Math.min(100, rest.humidity),
    date: new Date(time * 1000),
  }
}

function toPredictionData(dto: PredictionDataDto): PredictionData {
  const { predictedTime, ...rest } = dto
  return {
    ...rest,
    humidity: Math.min(100, rest.humidity),
    precipitation: Math.max(0, rest.precipitation),
    predictedDate: new Date(predictedTime * 1000),
  }
}

export async function getPredictions(
  hoursFromNow: number,
  modelName: WeatherModel = "DMI",
): Promise<PredictionData[]> {
  const result = await fetch(
    `${BASE_URL}/getPredictionsNextHours?hoursFromNow=${hoursFromNow}&modelName=${modelName}`,
  )

  if (!result.ok) {
    throw new Error(`Failed to fetch weather prediction: ${result.statusText}`)
  }

  const data: PredictionDataDto[] = await result.json()
  return data.map(toPredictionData)
}

/** Returns datapoint closest to timestamp 24 hours from now */
export async function getPredictionNext24Hours(
  modelName: WeatherModel = "DMI",
): Promise<PredictionData> {
  const result = await fetch(
    `${BASE_URL}/getPredictionNext24Hours?modelName=${modelName}`,
  )

  if (!result.ok) {
    throw new Error(`Failed to fetch weather prediction: ${result.statusText}`)
  }

  const data: PredictionDataDto = await result.json()
  return toPredictionData(data)
}

/** Takes unix timestamps in seconds */
export async function getPredictionsInRange(
  startTime: number,
  endTime: number,
  modelName: WeatherModel = "DMI",
): Promise<PredictionData[]> {
  const result = await fetch(
    `${BASE_URL}/getPredictionsInRange?startTime=${startTime}&endTime=${endTime}&modelName=${modelName}`,
  )

  if (!result.ok) {
    throw new Error(
      `Failed to fetch weather predictions in range: ${result.statusText}`,
    )
  }

  const data: PredictionDataDto[] = await result.json()
  return data.map(toPredictionData)
}

export async function getPredictionsInRangeUsingDates(
  startDate: Date,
  endDate: Date,
  modelName: WeatherModel = "DMI",
): Promise<PredictionData[]> {
  const startTimestamp = Math.floor(startDate.getTime() / 1000)
  const endTimestamp = Math.floor(endDate.getTime() / 1000)

  return getPredictionsInRange(startTimestamp, endTimestamp, modelName)
}

// Maybe add InRange to name
/** Takes unix timestamps in seconds */
export async function getHistoricalDataInRange(
  startTime: number,
  endTime: number,
): Promise<WeatherData[]> {
  const result = await fetch(
    `${BASE_URL}/getWeatherInRange?startTime=${startTime}&endTime=${endTime}`,
  )
  if (!result.ok) {
    throw new Error(
      `Failed to fetch historical weather data: ${result.statusText}`,
    )
  }
  const data: WeatherDataDto[] = await result.json()
  return data.map(toWeatherData)
}

export async function getHistoricalDataInRangeUsingDates(
  startDate: Date,
  endDate: Date,
): Promise<WeatherData[]> {
  const startTimestamp = Math.floor(startDate.getTime() / 1000)
  const endTimestamp = Math.floor(endDate.getTime() / 1000)

  return getHistoricalDataInRange(startTimestamp, endTimestamp)
}

// Helper function
export async function getLast24Hours(): Promise<WeatherData[]> {
  const endTimestamp = Math.floor(Date.now() / 1000)
  const startTimestamp = endTimestamp - 24 * 60 * 60

  return getHistoricalDataInRange(startTimestamp, endTimestamp)
}

export async function getLatestWeather(): Promise<WeatherData> {
  const result = await fetch(`${BASE_URL}/getLatestWeather`)
  if (!result.ok) {
    throw new Error(`Failed to fetch latest weather data: ${result.statusText}`)
  }
  const data: WeatherDataDto = await result.json()
  return toWeatherData(data)
}
