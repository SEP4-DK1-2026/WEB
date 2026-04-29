import { useEffect, useState } from 'react';
import { BASE_URL } from '../features/fetch-weather-data/api/weatherApi';

interface WeatherData {
  unixTime: number;
  temperature: number;
  humidity: number;
  windSpeed: number;
  windDirection: number;
  precipitation: number;
  light: number;
  leadTimeHours?: number;
}

interface WeatherBoxProps {
  title: string;
  data: WeatherData;
}

function formatWindDirection(degrees: number) {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  return directions[Math.round(degrees / 45) % 8];
}

function formatDate(unixTime: number) {
  return new Date(unixTime * 1000).toLocaleString('da-DK', {
    dateStyle: 'short',
    timeStyle: 'short',
  });
}

const WeatherBox = ({ title, data }: WeatherBoxProps) => {
  return (
    <div className="rounded-lg border border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100 p-8 shadow-lg">
      <h2 className="mb-2 text-2xl font-bold text-blue-900">{title}</h2>
      <p className="mb-6 text-sm text-gray-600">{formatDate(data.unixTime)}</p>

      <div className="grid grid-cols-2 gap-6">
        <div className="rounded-lg bg-white p-4 shadow-md">
          <p className="text-sm font-semibold text-gray-600">Temperatur</p>
          <p className="mt-2 text-3xl font-bold text-orange-500">
            {data.temperature}°C
          </p>
        </div>

        <div className="rounded-lg bg-white p-4 shadow-md">
          <p className="text-sm font-semibold text-gray-600">Luftfugtighed</p>
          <p className="mt-2 text-3xl font-bold text-blue-500">
            {data.humidity}%
          </p>
        </div>

        <div className="rounded-lg bg-white p-4 shadow-md">
          <p className="text-sm font-semibold text-gray-600">Nedbør</p>
          <p className="mt-2 text-3xl font-bold text-blue-500">
            {data.precipitation} mm
          </p>
        </div>

        <div className="rounded-lg bg-white p-4 shadow-md">
          <p className="text-sm font-semibold text-gray-600">Vindhastighed</p>
          <p className="mt-2 text-3xl font-bold text-cyan-500">
            {data.windSpeed} m/s
          </p>
        </div>

        <div className="rounded-lg bg-white p-4 shadow-md">
          <p className="text-sm font-semibold text-gray-600">Vindretning</p>
          <p className="mt-2 text-3xl font-bold text-indigo-500">
            {formatWindDirection(data.windDirection)} ({data.windDirection}°)
          </p>
        </div>

        <div className="rounded-lg bg-white p-4 shadow-md">
          <p className="text-sm font-semibold text-gray-600">Lys</p>
          <p className="mt-2 text-3xl font-bold text-yellow-500">
            {data.light} lx
          </p>
        </div>
      </div>
    </div>
  );
};

export default function WeatherStation() {
  const [currentWeather, setCurrentWeather] = useState<WeatherData | null>(null);
  const [predictedWeather, setPredictedWeather] = useState<WeatherData | null>(
    null,
  );

  useEffect(() => {
    async function loadWeather() {
      const [currentResponse, predictionResponse] = await Promise.all([
        fetch(`${BASE_URL}/current`),
        fetch(`${BASE_URL}/predict?hoursFromNow=1`),
      ]);

      const currentData: WeatherData = await currentResponse.json();
      const predictionData: WeatherData[] = await predictionResponse.json();

      setCurrentWeather(currentData);
      setPredictedWeather(predictionData[0] ?? null);
    }

    void loadWeather();
  }, []);

  if (!currentWeather || !predictedWeather) {
    return <p className="text-gray-600">Indlæser vejrdata...</p>;
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="mb-2 text-4xl font-bold text-gray-800">Weather Station</h1>
        <p className="text-gray-600">
          Real-time weather monitoring and forecast
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <WeatherBox title="Nuværende vejr" data={currentWeather} />
        <WeatherBox title="Forventet vejr" data={predictedWeather} />
      </div>
    </div>
  );
}