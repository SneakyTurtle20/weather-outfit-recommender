import type { NextApiRequest, NextApiResponse } from 'next'
import { NextResponse } from 'next/server'
// Import axios for making HTTP requests
import axios from 'axios'

// Get the OpenWeatherMap API key from environment variables
const API_KEY = process.env.OPENWEATHERMAP_API_KEY

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const lat = searchParams.get('lat')
  const lon = searchParams.get('lon')

  if (!lat || !lon) {
    return NextResponse.json({ error: 'Latitude and longitude are required' }, { status: 400 })
  }

  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
    )
    return NextResponse.json({ data: response.data, status: 200 })
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching weather data', status: 500 })
  }
}

export async function POST(req: Request) {
  return NextResponse.json({  error: 'Method not allowed' }, { status: 405 })
}

export async function PATCH(req: Request) {
  return NextResponse.json({  error: 'Method not allowed' }, { status: 405 })
}

export async function PUT(req: Request) {
  return NextResponse.json({  error: 'Method not allowed' }, { status: 405 })
}

export async function DELETE(req: Request) {
  return NextResponse.json({  error: 'Method not allowed' }, { status: 405 })
}