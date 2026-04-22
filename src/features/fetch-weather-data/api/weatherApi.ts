import { type WeatherData } from "../../../types/weatherData"

const BASE_URL = "https://example.com/api/weather"

export async function getPrediction(hoursFromNow: number): Promise<WeatherData[]> {
    const result = await fetch(`${BASE_URL}/predict?hoursFromNow=${hoursFromNow}`)
    if (!result.ok) {
        throw new Error(`Failed to fetch weather prediction: ${result.statusText}`)
    }
    const data: WeatherData[] = await result.json()
    return data
}

export async function getHistoricalData(startDate: number, endDate: number): Promise<WeatherData[]> {
    const result = await fetch(`${BASE_URL}/historical?startDate=${startDate}&endDate=${endDate}`)
    if (!result.ok) {
        throw new Error(`Failed to fetch historical weather data: ${result.statusText}`)
    }
    const data: WeatherData[] = await result.json()
    return data
}

export async function getCurrentWeather(): Promise<WeatherData> {
    const result = await fetch(`${BASE_URL}/current`)
    if (!result.ok) {
        throw new Error(`Failed to fetch current weather data: ${result.statusText}`)
    }
    const data: WeatherData = await result.json()
    return data
}
