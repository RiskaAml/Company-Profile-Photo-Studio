import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, Camera, CheckCircle } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function ForgotPasswordPage() {
  const [step, setStep]           = useState(1) // 1=email, 2=otp, 3=newpw, 4=done
  const [email, setEmail]         = useState('')
  const [otp, setOtp]             = useState('')
  const [newPw, setNewPw]         = useState('')
  const [error, setError]         = useState('')
  const [loading, setLoading]     = useState(false)

  const { requestOtp, verifyOtp, resetPassword } = useAuth()
  const navigate = useNavigate()

  const submitEmail = async (e) => {
    e.preventDefault(); setError(''); setLoading(true)
    await new Promise(r => setTimeout(r, 600))
    const res = requestOtp(email)
    setLoading(false)
    if (!res.ok) { setError(res.error); return }
    setStep(2)
  }

  const submitOtp = async (e) => {
    e.preventDefault(); setError(''); setLoading(true)
    await new Promise(r => setTimeout(r, 400))
    const res = verifyOtp(otp)
    setLoading(false)
    if (!res.ok) { setError(res.error); return }
    setStep(3)
  }

  const submitNewPw = async (e) => {
    e.preventDefault(); setError('')
    if (newPw.length < 6) { setError('Password minimal 6 karakter.'); return }
    setLoading(true)
    await new Promise(r => setTimeout(r, 400))
    resetPassword(email, newPw)
    setLoading(false)
    setStep(4)
  }

  return (
    <div className="min-h-screen bg-[#F0FDFB] flex items-center justify-center px-5 pt-16">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-mint-DEFAULT to-purple-DEFAULT flex items-center justify-center mx-auto mb-4 glow-mint">
            <Camera size={20} className="text-d0" />
          </div>
          <h1 className="font-display font-bold text-2xl text-main mb-1">Reset Password</h1>
          <p className="text-sub text-sm">Dolananpoto Studio</p>
        </div>

        <div className="bg-white border border-[#C5F0EA] rounded-2xl p-6">

          {/* Step indicator */}
          {step < 4 && (
            <div className="flex gap-1.5 mb-6">
              {[1,2,3].map(s => (
                <div key={s} className={`h-1 flex-1 rounded-full transition-colors ${s <= step ? 'bg-mint-DEFAULT' : 'bg-zinc-200'}`} />
              ))}
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3 mb-4">
              {error}
            </div>
          )}

          {step === 1 && (
            <form onSubmit={submitEmail} className="space-y-4">
              <p className="text-sm text-sub mb-3">Masukkan email kamu, kami akan kirim kode OTP.</p>
              <div>
                <label htmlFor="forgot-email" className="block text-sm font-medium text-main mb-1.5">Email</label>
                <input id="forgot-email" type="email" required value={email} onChange={e => setEmail(e.target.value)}
                  placeholder="kamu@email.com"
                  className="w-full bg-[#F0FDFB] border border-[#C5F0EA] rounded-xl px-4 py-2.5 text-sm text-main placeholder:text-sub focus:outline-none focus:border-mint-DEFAULT transition-colors"
                />
              </div>
              <button type="submit" disabled={loading}
                className="w-full bg-mint-DEFAULT text-d0 font-bold text-sm py-2.5 rounded-xl hover:bg-mint-dark transition-colors glow-mint disabled:opacity-60">
                {loading ? 'Mengirim...' : 'Kirim Kode OTP'}
              </button>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={submitOtp} className="space-y-4">
              <div className="bg-mint-DEFAULT/10 border border-mint-DEFAULT/20 rounded-xl px-4 py-3 mb-2">
                <p className="text-xs text-mint-DEFAULT font-medium">✅ Kode OTP telah dikirim ke <strong>{email}</strong></p>
                <p className="text-xs text-sub mt-1">Gunakan kode: <strong className="text-main">123456</strong> (simulasi)</p>
              </div>
              <div>
                <label htmlFor="forgot-otp" className="block text-sm font-medium text-main mb-1.5">Kode OTP (6 digit)</label>
                <input id="forgot-otp" type="text" required value={otp} onChange={e => setOtp(e.target.value)}
                  placeholder="123456" maxLength={6} inputMode="numeric"
                  className="w-full bg-[#F0FDFB] border border-[#C5F0EA] rounded-xl px-4 py-2.5 text-sm text-main placeholder:text-sub focus:outline-none focus:border-mint-DEFAULT transition-colors tracking-widest text-center text-lg font-mono"
                />
              </div>
              <button type="submit" disabled={loading}
                className="w-full bg-mint-DEFAULT text-d0 font-bold text-sm py-2.5 rounded-xl hover:bg-mint-dark transition-colors glow-mint disabled:opacity-60">
                {loading ? 'Memverifikasi...' : 'Verifikasi OTP'}
              </button>
            </form>
          )}

          {step === 3 && (
            <form onSubmit={submitNewPw} className="space-y-4">
              <p className="text-sm text-sub mb-3">Masukkan password baru kamu.</p>
              <div>
                <label htmlFor="forgot-newpw" className="block text-sm font-medium text-main mb-1.5">Password Baru</label>
                <input id="forgot-newpw" type="password" required value={newPw} onChange={e => setNewPw(e.target.value)}
                  placeholder="Min. 6 karakter"
                  className="w-full bg-[#F0FDFB] border border-[#C5F0EA] rounded-xl px-4 py-2.5 text-sm text-main placeholder:text-sub focus:outline-none focus:border-mint-DEFAULT transition-colors"
                />
              </div>
              <button type="submit" disabled={loading}
                className="w-full bg-mint-DEFAULT text-d0 font-bold text-sm py-2.5 rounded-xl hover:bg-mint-dark transition-colors glow-mint disabled:opacity-60">
                {loading ? 'Menyimpan...' : 'Simpan Password'}
              </button>
            </form>
          )}

          {step === 4 && (
            <div className="text-center py-4">
              <CheckCircle size={48} className="text-mint-DEFAULT mx-auto mb-4" />
              <h3 className="font-display font-bold text-lg text-main mb-2">Password Berhasil Direset!</h3>
              <p className="text-sub text-sm mb-5">Silakan masuk dengan password baru kamu.</p>
              <button onClick={() => navigate('/masuk')}
                className="w-full bg-mint-DEFAULT text-d0 font-bold text-sm py-2.5 rounded-xl hover:bg-mint-dark transition-colors glow-mint">
                Masuk Sekarang
              </button>
            </div>
          )}
        </div>

        {step < 4 && (
          <div className="text-center mt-5">
            <Link to="/masuk" className="inline-flex items-center gap-1.5 text-sm text-sub hover:text-main transition-colors">
              <ArrowLeft size={14} /> Kembali ke Login
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
