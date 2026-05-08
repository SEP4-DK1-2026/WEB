/**
 * Dynamic mock data generator for weather API testing.
 * Generates realistic data points centered around the current time.
 */

export type WeatherDtoMock = {
  time: number // unix time in seconds (for API responses)
  temperature: number
  humidity: number
  windSpeed: number
  windDirection: number
  precipitation: number
  light: number
}

export type PredictionDtoMock = Omit<WeatherDtoMock, "time"> & {
  predictedTime: number
  predictionOffset: number
}

/**
 * Generates a pseudo-random but deterministic value based on a seed.
 * Used to create consistent mock data for the same timestamps.
 */
function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value))
}

function applyPredictionVariance(
  weather: Omit<WeatherDtoMock, "time">,
  timestamp: number,
  predictionOffset: number,
): Omit<WeatherDtoMock, "time"> {
  const seedBase = timestamp / 3600 + predictionOffset * 7

  return {
    temperature: weather.temperature + (seededRandom(seedBase) - 0.5) * 4,
    humidity: clamp(
      weather.humidity + (seededRandom(seedBase + 1) - 0.5) * 12,
      25,
      100,
    ),
    windSpeed: clamp(
      weather.windSpeed + (seededRandom(seedBase + 2) - 0.5) * 4,
      0,
      25,
    ),
    windDirection: clamp(
      weather.windDirection + (seededRandom(seedBase + 3) - 0.5) * 40,
      0,
      360,
    ),
    precipitation: clamp(
      weather.precipitation + (seededRandom(seedBase + 4) - 0.5) * 2,
      0,
      15,
    ),
    light: clamp(
      weather.light + (seededRandom(seedBase + 5) - 0.5) * 20000,
      0,
      120000,
    ),
  }
}

/**
 * Generates a mock weather data point for a given timestamp.
 */
function generateWeatherDataPoint(timestamp: number): WeatherDtoMock {
  const seed = timestamp / 3600 // Use hour-based seed for variation

  return {
    time: timestamp,
    temperature: 5 + seededRandom(seed) * 20, // 5-25°C
    humidity: 40 + seededRandom(seed + 1) * 55, // 40-95%
    windSpeed: seededRandom(seed + 2) * 15, // 0-15 m/s
    windDirection: seededRandom(seed + 3) * 360, // 0-360°
    precipitation:
      seededRandom(seed + 4) > 0.7 ? seededRandom(seed + 5) * 10 : 0, // 0-10mm, 30% chance
    light: seededRandom(seed + 6) > 0.3 ? seededRandom(seed + 7) * 100000 : 0, // 0-100000 lux, 70% chance of daylight
  }
}

/**
 * Generates mock prediction data for a given timestamp.
 */
function generatePredictionDataPoint(
  timestamp: number,
  predictionOffset: number,
): PredictionDtoMock {
  const { time: _time, ...weatherData } = generateWeatherDataPoint(timestamp)
  const adjustedWeather = applyPredictionVariance(
    weatherData,
    timestamp,
    predictionOffset,
  )
  return {
    ...adjustedWeather,
    predictedTime: timestamp,
    predictionOffset,
  }
}

/**
 * Generates historical data points for a given time range.
 * Data points are generated every hour.
 */
export function generateHistoricalData(
  startTimestamp: number,
  endTimestamp: number,
): WeatherDtoMock[] {
  const data: WeatherDtoMock[] = []

  // Generate data points every hour
  for (
    let timestamp = startTimestamp;
    timestamp <= endTimestamp;
    timestamp += 3600
  ) {
    data.push(generateWeatherDataPoint(timestamp))
  }

  return data
}

/**
 * Generates prediction data points for a given time range.
 * Data points are generated every hour with prediction offset.
 */
export function generatePredictionData(
  startTimestamp: number,
  endTimestamp: number,
  predictionOffsetHours: number = 0,
): PredictionDtoMock[] {
  const data: PredictionDtoMock[] = []

  // Generate prediction data points every hour
  for (
    let timestamp = startTimestamp;
    timestamp <= endTimestamp;
    timestamp += 3600
  ) {
    data.push(generatePredictionDataPoint(timestamp, predictionOffsetHours))
  }

  return data
}

/**
 * Generates prediction data for N hours from now.
 */
export function generateNextHoursPredictions(
  hoursFromNow: number,
): PredictionDtoMock[] {
  const nowInSeconds = Math.floor(Date.now() / 1000)
  const totalHours = Math.max(0, Math.floor(hoursFromNow))
  const data: PredictionDtoMock[] = []

  for (let hourOffset = 0; hourOffset < totalHours; hourOffset += 1) {
    const timestamp = nowInSeconds + hourOffset * 3600
    data.push(generatePredictionDataPoint(timestamp, hourOffset))
  }

  return data
}

/**
 * Gets the current/latest weather data point.
 */
export function getCurrentWeatherMock(): WeatherDtoMock {
  const nowInSeconds = Math.floor(Date.now() / 1000)
  return generateWeatherDataPoint(nowInSeconds)
}
