import { useEffect, useState } from 'react'
import './App.css'
import MyLineChart from '../components/MyLineChart'
import { getCurrentWeather, getPrediction } from '../features/fetch-weather-data/api/weatherApi.ts'

function App() {
  const [currentWeather, setCurrentWeather] = useState<Awaited<ReturnType<typeof getCurrentWeather>> | null>(null)
  const [next24HoursWeather, setNext24HoursWeather] = useState<Awaited<ReturnType<typeof getPrediction>> | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadWeather = async () => {
      try {
        const data = await getCurrentWeather()
        setCurrentWeather(data)
      } catch {
        setError('Failed to load weather data')
      }
    }

    const loadPrediction = async () => {
      try {
        const data = await getPrediction(24)
        setNext24HoursWeather(data)
      } catch {
        setError('Failed to load weather prediction')
      }
    }

    loadPrediction()

    loadWeather()
  }, [])

  return (
    <>
      <section id="center">
        <MyLineChart data={next24HoursWeather ?? []} includeAxes={true} />
      </section>
      <section id="center">
        <p>{error ?? (currentWeather ? JSON.stringify(currentWeather) : 'Loading weather...')}</p>
        <p>{error ?? (next24HoursWeather ? JSON.stringify(next24HoursWeather) : 'Loading prediction...')}</p>
      </section>
    </>
  )
}

export default App
