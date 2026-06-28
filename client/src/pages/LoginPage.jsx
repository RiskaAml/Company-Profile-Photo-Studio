import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Eye, EyeOff, Camera } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function LoginPage() {
  const [email, setEmail]     = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw]   = useState(false)
  const [error, setError]     = useState('')
  const [loading, setLoading] = useState(false)

  const { login }  = useAuth()
  const navigate   = useNavigate()
  const location   = useLocation()
  const from = location.state?.from || '/'

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    await new Promise(r => setTimeout(r, 400))
    const res = login(email, password)
    setLoading(false)
    if (!res.ok) { setError(res.error); return }
    navigate(from, { replace: true })
  }

  return (
    <div className="min-h-screen bg-[#F0FDFB] flex items-center justify-center px-5 pt-16">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-mint-DEFAULT to-purple-DEFAULT flex items-center justify-center mx-auto mb-4 glow-mint">
            <Camera size={20} className="text-d0" />
          </div>
          <h1 className="font-display font-bold text-2xl text-main mb-1">Masuk ke Akun</h1>
          <p className="text-sub text-sm">Dolananpoto Studio</p>
        </div>

        <div className="bg-white border border-[#C5F0EA] rounded-2xl p-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3 mb-4">
              {error}
            </div>
          )}

          <form onSubmit={submit} className="space-y-4">
            <div>
              <label htmlFor="login-email" className="block text-sm font-medium text-main mb-1.5">Email</label>
              <input
                id="login-email"
                type="email" required value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="kamu@email.com"
                className="w-full bg-[#F0FDFB] border border-[#C5F0EA] rounded-xl px-4 py-2.5 text-sm text-main placeholder:text-sub focus:outline-none focus:border-mint-DEFAULT transition-colors"
              />
            </div>

            <div>
              <label htmlFor="login-password" className="block text-sm font-medium text-main mb-1.5">Password</label>
              <div className="relative">
                <input
                  id="login-password"
                  type={showPw ? 'text' : 'password'} required value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#F0FDFB] border border-[#C5F0EA] rounded-xl px-4 py-2.5 pr-10 text-sm text-main placeholder:text-sub focus:outline-none focus:border-mint-DEFAULT transition-colors"
                />
                <button type="button" onClick={() => setShowPw(s => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-sub hover:text-main transition-colors">
                  {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            <div className="text-right">
              <Link to="/lupa-password" className="text-xs text-mint-DEFAULT hover:underline">Lupa password?</Link>
            </div>

            <button type="submit" disabled={loading}
              className="w-full bg-mint-DEFAULT text-d0 font-bold text-sm py-2.5 rounded-xl hover:bg-mint-dark transition-colors glow-mint disabled:opacity-60">
              {loading ? 'Memproses...' : 'Masuk'}
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-sub mt-5">
          Belum punya akun?{' '}
          <Link to="/daftar" className="text-mint-DEFAULT font-semibold hover:underline">Daftar sekarang</Link>
        </p>
      </div>
    </div>
  )
}
