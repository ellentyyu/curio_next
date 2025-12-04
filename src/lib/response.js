export const success = (status, data) => {
  return {
    success: true,
    status,
    data,
  }
}

export const fail = (status, message) => {
  return {
    success: false,
    status,
    error: {
      message,
    },
  }
}
