import mongoose from 'mongoose'

const mongoUrl = process.env.MONGODB_URI

if (!mongoUrl) {
  throw new Error('MONGODB_URI is not defined')
}
let cached = global.mongoose
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

export async function connectDB() {
  if (cached.conn) return cached.conn
  if (!cached.promise) {
    cached.promise = await mongoose.connect(mongoUrl)
  }
  cached.conn = await cached.promise
  return cached.conn
}
