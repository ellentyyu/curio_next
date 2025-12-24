export function success(status, data) {
  return {
    success: true,
    status,
    data,
  }
}

export function fail(status, message) {
  return {
    success: false,
    status,
    error: {
      message,
    },
  }
}
