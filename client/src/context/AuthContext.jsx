import { createContext, useContext, useState } from 'react'

const AuthCtx = createContext()

const ADMIN_EMAIL = 'admin@dolananpoto.com'
const ADMIN_PASS  = 'admin123'

// Simulated registered users (in-memory only)
const REGISTERED = [
  { email: ADMIN_EMAIL, password: ADMIN_PASS, name: 'Admin', isAdmin: true },
]

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  const login = (email, password) => {
    const found = REGISTERED.find(u => u.email === email && u.password === password)
    if (!found) return { ok: false, error: 'Email atau password salah.' }
    setUser({ email: found.email, name: found.name, isAdmin: found.isAdmin || false })
    return { ok: true }
  }

  const signup = (name, email, password) => {
    if (REGISTERED.find(u => u.email === email)) {
      return { ok: false, error: 'Email sudah terdaftar.' }
    }
    const newUser = { email, password, name, isAdmin: false }
    REGISTERED.push(newUser)
    setUser({ email, name, isAdmin: false })
    return { ok: true }
  }

  const logout = () => setUser(null)

  // Simulated OTP: always "123456" for any email
  const requestOtp = (email) => {
    const exists = REGISTERED.find(u => u.email === email)
    if (!exists) return { ok: false, error: 'Email tidak ditemukan.' }
    return { ok: true }
  }

  const verifyOtp = (otp) => {
    if (otp === '123456') return { ok: true }
    return { ok: false, error: 'Kode OTP salah. Coba: 123456' }
  }

  const resetPassword = (email, newPassword) => {
    const u = REGISTERED.find(u => u.email === email)
    if (!u) return { ok: false, error: 'Email tidak ditemukan.' }
    u.password = newPassword
    return { ok: true }
  }

  return (
    <AuthCtx.Provider value={{ user, login, signup, logout, requestOtp, verifyOtp, resetPassword }}>
      {children}
    </AuthCtx.Provider>
  )
}

export const useAuth = () => useContext(AuthCtx)
