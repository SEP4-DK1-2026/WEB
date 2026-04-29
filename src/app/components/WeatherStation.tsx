import React from 'react';

interface WeatherData {
  temperature: number;
  rainfall: number;
  windSpeed: number;
  windDirection: string;
  light: number;
}

interface WeatherBoxProps {
  title: string;
  data: WeatherData;
}

const WeatherBox: React.FC<WeatherBoxProps> = ({ title, data }) => {
  return (
    <div className="rounded-lg border border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100 p-8 shadow-lg">
      <h2 className="mb-6 text-2xl font-bold text-blue-900">{title}</h2>

      <div className="grid grid-cols-2 gap-6">
        <div className="rounded-lg bg-white p-4 shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-600">Temperature</p>
              <p className="mt-2 text-3xl font-bold text-orange-500">{data.temperature}°C</p>
            </div>
            <span className="text-4xl">🌡️</span>
          </div>
        </div>

        <div className="rounded-lg bg-white p-4 shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-600">Rainfall</p>
              <p className="mt-2 text-3xl font-bold text-blue-500">{data.rainfall} mm</p>
            </div>
            <span className="text-4xl">🌧️</span>
          </div>
        </div>

        <div className="rounded-lg bg-white p-4 shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-600">Wind Speed</p>
              <p className="mt-2 text-3xl font-bold text-cyan-500">{data.windSpeed} m/s</p>
            </div>
            <span className="text-4xl">💨</span>
          </div>
        </div>

        <div className="rounded-lg bg-white p-4 shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-600">Wind Direction</p>
              <p className="mt-2 text-3xl font-bold text-indigo-500">{data.windDirection}</p>
            </div>
            <span className="text-4xl">🧭</span>
          </div>
        </div>

        <div className="col-span-2 rounded-lg bg-white p-4 shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-600">Light Intensity</p>
              <div className="mt-2 flex items-center gap-3">
                <p className="text-3xl font-bold text-yellow-500">{data.light}%</p>
                <div className="h-3 w-32 overflow-hidden rounded-full bg-gray-200">
                  <div
                    className="h-full bg-gradient-to-r from-yellow-400 to-yellow-500 transition-all"
                    style={{ width: `${data.light}%` }}
                  />
                </div>
              </div>
            </div>
            <span className="text-4xl">☀️</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const WeatherStation: React.FC = () => {
  const currentWeather: WeatherData = {
    temperature: 22,
    rainfall: 2.5,
    windSpeed: 4.8,
    windDirection: 'NW',
    light: 75,
  };

  const predictedWeather: WeatherData = {
    temperature: 19,
    rainfall: 5.2,
    windSpeed: 6.3,
    windDirection: 'SW',
    light: 45,
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="mb-2 text-4xl font-bold text-gray-800">Weather Station</h1>
        <p className="text-gray-600">Real-time weather monitoring and forecast</p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <WeatherBox title="Current Weather" data={currentWeather} />
        <WeatherBox title="Predicted Weather" data={predictedWeather} />
      </div>
    </div>
  );
};

export default WeatherStation;