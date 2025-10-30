import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
export async function POST(request) {
  const cookiesStore = await cookies()
  cookiesStore.delete('token', { path: '/' })
  return NextResponse.json(
    { message: 'Logged out successfully' },
    { status: 200 },
  )
}
