import { useEffect, useState } from 'react'
import './App.css'
import MyLineChart from '../components/MyLineChart'
import { getCurrentWeather } from '../features/fetch-weather-data/api/weatherApi.ts'

function App() {
  const [weather, setWeather] = useState<Awaited<ReturnType<typeof getCurrentWeather>> | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadWeather = async () => {
      try {
        const data = await getCurrentWeather()
        setWeather(data)
      } catch {
        setError('Failed to load weather data')
      }
    }

    loadWeather()
  }, [])

  return (
    <>
      <section id="center">
        <MyLineChart includeAxes={false} />
      </section>
      <section id="center">
        <p>{error ?? (weather ? JSON.stringify(weather) : 'Loading weather...')}</p>
      </section>
    </>
  )
}

export default App
