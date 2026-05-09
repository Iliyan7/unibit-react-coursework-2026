import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

const USERS_KEY = 'rcd_users'
const SESSION_KEY = 'rcd_session'

function loadUsers() {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY)) || []
  } catch {
    return []
  }
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(SESSION_KEY))
    } catch {
      return null
    }
  })

  function register({ name, email, password }) {
    const users = loadUsers()
    if (users.find(u => u.email === email)) {
      throw new Error('Email already registered')
    }
    const newUser = { id: Date.now(), name, email, password }
    saveUsers([...users, newUser])
    const session = { id: newUser.id, name: newUser.name, email: newUser.email }
    localStorage.setItem(SESSION_KEY, JSON.stringify(session))
    setUser(session)
  }

  function login({ email, password }) {
    const users = loadUsers()
    const found = users.find(u => u.email === email && u.password === password)
    if (!found) throw new Error('Invalid email or password')
    const session = { id: found.id, name: found.name, email: found.email }
    localStorage.setItem(SESSION_KEY, JSON.stringify(session))
    setUser(session)
  }

  function logout() {
    localStorage.removeItem(SESSION_KEY)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
