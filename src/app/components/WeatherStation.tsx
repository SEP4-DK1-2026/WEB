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
  variant?: 'current' | 'predicted';
}

const WeatherBox: React.FC<WeatherBoxProps> = ({ title, data, variant = 'current' }) => {
  const isCurrentWeather = variant === 'current';
  const gradientClass = isCurrentWeather 
    ? 'bg-gradient-to-br from-blue-50 to-blue-100 border-blue-300' 
    : 'bg-gradient-to-br from-purple-50 to-purple-100 border-purple-300';
  const titleClass = isCurrentWeather ? 'text-blue-900' : 'text-purple-900';

  return (
    <div className={`${gradientClass} rounded-lg shadow-lg p-8 border-2`}>
      <h2 className={`text-2xl font-bold ${titleClass} mb-6`}>{title}</h2>
      
      <div className="grid grid-cols-2 gap-6">
        {/* Temperature */}
        <div className="bg-white rounded-lg p-4 shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-semibold">Temperature</p>
              <p className="text-3xl font-bold text-orange-500 mt-2">{data.temperature}°C</p>
            </div>
            <span className="text-4xl">🌡️</span>
          </div>
        </div>

        {/* Rainfall */}
        <div className="bg-white rounded-lg p-4 shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-semibold">Rainfall</p>
              <p className="text-3xl font-bold text-blue-500 mt-2">{data.rainfall} mm</p>
            </div>
            <span className="text-4xl">🌧️</span>
          </div>
        </div>

        {/* Wind Speed */}
        <div className="bg-white rounded-lg p-4 shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-semibold">Wind Speed</p>
              <p className="text-3xl font-bold text-cyan-500 mt-2">{data.windSpeed} m/s</p>
            </div>
            <span className="text-4xl">💨</span>
          </div>
        </div>

        {/* Wind Direction */}
        <div className="bg-white rounded-lg p-4 shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-semibold">Wind Direction</p>
              <p className="text-3xl font-bold text-indigo-500 mt-2">{data.windDirection}</p>
            </div>
            <span className="text-4xl">🧭</span>
          </div>
        </div>

        {/* Light */}
        <div className="bg-white rounded-lg p-4 shadow-md col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-semibold">Light Intensity</p>
              <div className="flex items-center gap-3 mt-2">
                <p className="text-3xl font-bold text-yellow-500">{data.light}%</p>
                <div className="w-32 h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-yellow-400 to-yellow-500 transition-all"
                    style={{ width: `${data.light}%` }}
                  ></div>
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
  // Placeholder data for current weather
  const currentWeather: WeatherData = {
    temperature: 22,
    rainfall: 2.5,
    windSpeed: 4.8,
    windDirection: 'NW',
    light: 75,
  };

  // Placeholder data for predicted weather
  const predictedWeather: WeatherData = {
    temperature: 19,
    rainfall: 5.2,
    windSpeed: 6.3,
    windDirection: 'SW',
    light: 45,
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Weather Station</h1>
        <p className="text-gray-600 mb-12">Real-time weather monitoring and forecast</p>

        <div className="flex gap-8">
          <div className="flex-1">
            <WeatherBox title="Current Weather" data={currentWeather} variant="current" />
          </div>
          <div className="flex-1">
            <WeatherBox title="Predicted Weather" data={predictedWeather} variant="predicted" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherStation;
