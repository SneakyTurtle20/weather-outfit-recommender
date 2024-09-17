'use client';

import { useState, useEffect } from 'react'
import axios from 'axios'
import { getOutfitRecommendation, OutfitRecommendation } from '../utils/recommendation'

export default function Home() {
  // eslint-disable-next-line
  const [weather, setWeather] = useState<any>(null)
  const [outfits, setOutfits] = useState<OutfitRecommendation>()
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchWeatherData = async (latitude: number, longitude: number) => {
      try {
        const response = await axios.get(`/api/weather?lat=${latitude}&lon=${longitude}`)
        setWeather(response.data.data)
        const recommendation = getOutfitRecommendation(
          response.data.data.weather[0].main,
          response.data.data.main.temp
        )
        setOutfits(recommendation)
      } catch (error) {
        console.error('Error fetching weather data:', error)
        setError('Failed to fetch weather data. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    const handleGeolocationError = (error: GeolocationPositionError) => {
      console.error('Geolocation error:', error)
      setError('Unable to get your location. Please enable location services and refresh the page.')
      setLoading(false)
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          fetchWeatherData(latitude, longitude)
        },
        handleGeolocationError,
        { timeout: 10000 } // 10 seconds timeout for geolocation
      )
    } else {
      setError('Geolocation is not supported by your browser.')
      setLoading(false)
    }
  }, [])

  const getWeatherIcon = (iconCode: string) => {
    return `http://openweathermap.org/img/wn/${iconCode}@2x.png`
  }

  if (loading) {
    return (
      <div className="container mx-auto p-4 min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200">
        <h1 className="text-4xl font-bold mb-8 text-blue-800">Weather Outfit Recommender</h1>
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-blue-500"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto p-4 min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-red-100 to-red-200">
        <h1 className="text-4xl font-bold mb-8 text-red-800">Weather Outfit Recommender</h1>
        <p className="text-red-600 text-lg mb-4">{error}</p>
        <button
          className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105"
          onClick={() => window.location.reload()}
        >
          Try Again
        </button>
      </div>
    )
  }

  if (!weather || !outfits) {
    return (
      <div className="container mx-auto p-4 min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
        <h1 className="text-4xl font-bold mb-8 text-gray-800">Weather Outfit Recommender</h1>
        <p className="text-gray-600 text-lg">No weather data available. Please try again later.</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4 min-h-screen bg-gradient-to-br from-blue-100 to-blue-200">
      <h1 className="text-4xl font-bold mb-8 text-center text-blue-800">Weather Outfit Recommender</h1>
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-blue-700">Current Weather</h2>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-3xl font-bold text-gray-800">{Math.round(weather.main.temp)}°C</p>
            <p className="text-xl text-gray-600">{weather.weather[0].description}</p>
          </div>
          <img 
            src={getWeatherIcon(weather.weather[0].icon)} 
            alt={weather.weather[0].description} 
            className="w-24 h-24"
          />
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-semibold mb-4 text-blue-700">Recommended Outfit</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(outfits).map(([category, items]) => (
            <div key={category} className="bg-blue-50 p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold capitalize mb-2 text-blue-600">{category}</h3>
              <ul className="list-disc list-inside text-gray-700">
                {(items as string[]).map((item, index) => (
                  <li key={index} className="mb-1">{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
