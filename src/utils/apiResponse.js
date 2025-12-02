import { NextResponse } from 'next/server'

export const jsonSuccess = (status, data) => {
  return NextResponse.json(
    {
      success: true,
      status,
      data,
    },
    { status },
  )
}

export const jsonFail = (status, message) => {
  return NextResponse.json(
    {
      success: false,
      status,
      error: {
        message,
      },
    },
    { status },
  )
}
