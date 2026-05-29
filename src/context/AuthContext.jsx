import { createContext, useContext, useState } from 'react'
import { useDb } from '../hooks/useDb'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const db = useDb()

  const [user, setUser] = useState(() => {
    try {
      const stored = sessionStorage.getItem('auth_user')
      return stored ? JSON.parse(stored) : null
    } catch {
      return null
    }
  })

  function login(email, password) {
    const users = db.getAll('users')
    const found = users.find(u => u.email === email && u.password === password)
    if (!found) return { success: false, message: 'E-mail ou senha incorretos.' }
    setUser(found)
    sessionStorage.setItem('auth_user', JSON.stringify(found))
    return { success: true }
  }

  function register(name, email, password) {
    const users = db.getAll('users')
    if (users.find(u => u.email === email)) {
      return { success: false, message: 'Este e-mail já está cadastrado.' }
    }
    const newUser = { name, email, password }
    const id = db.save('users', newUser)
    const userWithId = { ...newUser, id }
    setUser(userWithId)
    sessionStorage.setItem('auth_user', JSON.stringify(userWithId))
    return { success: true }
  }

  function logout() {
    setUser(null)
    sessionStorage.removeItem('auth_user')
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>')
  return ctx
}
