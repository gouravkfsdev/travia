// app/api/test/route.ts

import { NextResponse } from 'next/server'
import mongoose from 'mongoose'

const MONGO_URI = 'mongodb://mongo:27017/travias'

export async function GET() {
  try {
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(MONGO_URI)
    }

    return NextResponse.json({ message: 'MongoDB connected successfully!' })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: 'MongoDB connection failed', error }, { status: 500 })
  }
}
