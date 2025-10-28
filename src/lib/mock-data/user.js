const users = [
  {
    id: 1,
    email: 'test@test.com',
    password: 'test',
    name: 'Test User',
  },
]
export const login = async (email, password) => {
  const user = users.find(
    (user) => user.email === email && user.password === password,
  )
  return user
}
