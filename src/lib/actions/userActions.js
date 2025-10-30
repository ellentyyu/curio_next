import { connectDB } from '@/lib/db'
import User from '@/models/User'
import { generateToken } from '@/lib/jwt'
export const registerUser = async ({ name, email, password }) => {
  await connectDB()

  const existingUser = await User.findOne({ email })
  if (existingUser) {
    return { success: false, message: 'User already exists', status: 400 }
  }
  const user = await User.create({ name, email, password })
  const token = generateToken({ _id: user._id })
  return {
    status: 201,
    success: true,
    data: {
      token,
      user: { _id: user._id.toString(), name: user.name, email: user.email },
    },
  }
}

export const loginUser = async ({ email, password }) => {
  await connectDB()
  const user = await User.findOne({ email })
  if (!user) {
    return { success: false, message: 'User not found', status: 404 }
  }
  const isPasswordCorrect = await user.comparePassword(password)
  if (!isPasswordCorrect) {
    return { success: false, message: 'Invalid password', status: 401 }
  }
  const token = generateToken({ _id: user._id })
  return {
    status: 200,
    success: true,
    data: {
      token,
      user: { _id: user._id.toString(), name: user.name, email: user.email },
    },
  }
}
