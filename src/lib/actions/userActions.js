import { connectDB } from '@/lib/db'
import User from '@/models/User'
import { generateToken } from '@/lib/jwt'
import { success, fail } from '@/lib/response'

//** api response principle: id: _id.toString() instead of _id */
//** all server action return shape
/*
  {
    success: boolean;
    status: number;        // HTTP-like status code
    message?: string;      // optional human-readable message
    data?: any;            // optional payload
    errors?: Record<string, string>; // optional field-level errors
  } 
*/
export const registerUser = async ({ name, email, password }) => {
  try {
    await connectDB()

    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return fail(400, 'User already exists')
    }
    const user = await User.create({ name, email, password }) // return user document
    const id = user._id.toString()
    const token = generateToken(id) // return token string
    return success(201, {
      token,
      user: { id, name: user.name, email: user.email },
    })
  } catch (error) {
    return fail(500, 'register user failed')
  }
}

export const loginUser = async ({ email, password }) => {
  try {
    await connectDB()

    const user = await User.findOne({ email })
    if (!user) {
      return fail(404, 'User not found')
    }
    const isPasswordCorrect = await user.comparePassword(password)
    if (!isPasswordCorrect) {
      return fail(401, 'Invalid password')
    }

    const id = user._id.toString()
    const token = generateToken(id)

    return success(200, {
      token,
      user: { id, name: user.name, email: user.email },
    })
  } catch (error) {
    return fail(500, 'login user failed')
  }
}
