import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Check, MapPin, CreditCard, FileText, ChevronRight, ChevronLeft } from 'lucide-react'
import { useBooking } from '../context/BookingContext'
import { useAuth } from '../context/AuthContext'

const SELF_PHOTO_PACKAGES = [
  { id: 'sp1', name: 'Paket Hemat 30 Menit', price: 75000,  duration: '30 menit', persons: '1–2 orang',    img: 'selfphoto-1.png', features: ['Semua backdrop', 'Ring light', 'Free props'] },
  { id: 'sp2', name: 'Paket Standar 1 Jam',  price: 120000, duration: '1 jam',    persons: 'Hingga 4 orang', img: 'selfphoto-2.png', features: ['Semua backdrop', 'Ring light', 'Free props', 'Ganti outfit'] },
  { id: 'sp3', name: 'Paket Premium 2 Jam',  price: 200000, duration: '2 jam',    persons: 'Hingga 6 orang', img: 'selfphoto-3.png', features: ['Full akses backdrop', 'Full akses props', 'Bonus 5 foto edit'] },
  { id: 'sp4', name: 'Paket Couple 1 Jam',   price: 130000, duration: '1 jam',    persons: '2 orang',        img: 'selfphoto-4.png', features: ['Backdrop couple', 'Props couple', 'Ring light'] },
  { id: 'sp5', name: 'Paket Kelompok 3 Jam', price: 350000, duration: '3 jam',    persons: 'Hingga 10 orang',img: 'selfphoto-5.png', features: ['Full studio access', 'Free props all', 'Bonus 10 foto edit'] },
]

const LOCATIONS = ['Sidoarjo Kota', 'Waru', 'Gedangan', 'Surabaya Selatan']
const PAYMENTS  = ['Transfer Bank', 'QRIS', 'Tunai (Bayar di Studio)', 'ShopeePay / GoPay / OVO']

const imgs = import.meta.glob('../assets/*.{png,jpg,jpeg,webp,svg}', { eager: true, query: '?url', import: 'default' })
const img  = (n) => imgs[`../assets/${n}`] ?? ''

const STEPS = ['Pilih Paket', 'Pilih Lokasi', 'Pembayaran', 'Catatan']

export default function BookingPage() {
  const [params]     = useSearchParams()
  const preselect    = params.get('package') || 'sp1'
  const navigate     = useNavigate()
  const { addBooking } = useBooking()
  const { user }     = useAuth()

  const [step, setStep]           = useState(0)
  const [selected, setSelected]   = useState(preselect)
  const [location, setLocation]   = useState('')
  const [payment, setPayment]     = useState('')
  const [notes, setNotes]         = useState('')

  const pkg = SELF_PHOTO_PACKAGES.find(p => p.id === selected) || SELF_PHOTO_PACKAGES[0]

  const canNext = () => {
    if (step === 0) return !!selected
    if (step === 1) return !!location
    if (step === 2) return !!payment
    return true
  }

  const next = () => {
    if (step === STEPS.length - 1) { submit(); return }
    setStep(s => s + 1)
  }

  const submit = () => {
    const orderId = addBooking({
      type: 'Self Photo',
      package: pkg.name,
      price: pkg.price,
      location,
      payment,
      notes,
      date: new Date().toLocaleDateString('id-ID'),
      total: pkg.price,
      userName: user?.name || '',
      userEmail: user?.email || '',
    })
    navigate('/invoice', { state: { orderId, type: 'Self Photo', package: pkg.name, location, payment, notes, total: pkg.price, date: new Date().toLocaleDateString('id-ID') } })
  }

  return (
    <div className="min-h-screen bg-[#F0FDFB] pt-20 pb-16">
      <div className="container-x max-w-2xl">
        <h1 className="font-display font-bold text-2xl text-main mb-2">Booking Self Photo</h1>
        <p className="text-sub text-sm mb-8">Isi detail booking kamu di bawah ini.</p>

        {/* Step bar */}
        <div className="flex items-center gap-2 mb-8">
          {STEPS.map((s, i) => (
            <div key={s} className="flex items-center gap-2 flex-1">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 transition-colors
                ${i < step ? 'bg-mint-DEFAULT text-d0' : i === step ? 'bg-mint-DEFAULT text-d0 ring-4 ring-mint-DEFAULT/20' : 'bg-zinc-200 text-sub'}`}>
                {i < step ? <Check size={13} /> : i + 1}
              </div>
              <span className={`text-xs font-medium hidden sm:block ${i === step ? 'text-main' : 'text-sub'}`}>{s}</span>
              {i < STEPS.length - 1 && <div className={`flex-1 h-px ${i < step ? 'bg-mint-DEFAULT' : 'bg-zinc-200'}`} />}
            </div>
          ))}
        </div>

        <div className="bg-white border border-[#C5F0EA] rounded-2xl p-6">

          {/* Step 0: Pilih Paket */}
          {step === 0 && (
            <div>
              <h2 className="font-display font-bold text-lg text-main mb-4 flex items-center gap-2">
                <span className="text-2xl">📸</span> Pilih Paket
              </h2>
              <div className="space-y-3">
                {SELF_PHOTO_PACKAGES.map(p => (
                  <button key={p.id} onClick={() => setSelected(p.id)}
                    className={`w-full flex items-center gap-4 rounded-xl border-2 p-4 text-left transition-all ${selected === p.id ? 'border-mint-DEFAULT bg-mint-DEFAULT/5 glow-mint' : 'border-[#C5F0EA] hover:border-[#A8E6DF]'}`}>
                    <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-[#E6FAF7]">
                      {img(p.img) ? <img src={img(p.img)} alt={p.name} loading="lazy" className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-2xl">📷</div>}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-display font-bold text-sm text-main">{p.name}</div>
                      <div className="text-sub text-xs mt-0.5">{p.duration} · {p.persons}</div>
                      <div className="text-xs text-sub mt-1">{p.features.join(' · ')}</div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="font-display font-bold text-mint-DEFAULT">Rp {p.price.toLocaleString('id-ID')}</div>
                      {selected === p.id && <Check size={16} className="text-mint-DEFAULT mt-1 ml-auto" />}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 1: Pilih Lokasi */}
          {step === 1 && (
            <div>
              <h2 className="font-display font-bold text-lg text-main mb-4 flex items-center gap-2">
                <MapPin size={20} className="text-mint-DEFAULT" /> Pilih Lokasi Studio
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {LOCATIONS.map(loc => (
                  <button key={loc} onClick={() => setLocation(loc)}
                    className={`p-4 rounded-xl border-2 text-left transition-all ${location === loc ? 'border-mint-DEFAULT bg-mint-DEFAULT/5 glow-mint' : 'border-[#C5F0EA] hover:border-[#A8E6DF]'}`}>
                    <div className={`w-2 h-2 rounded-full mb-2 ${location === loc ? 'bg-mint-DEFAULT' : 'bg-zinc-300'}`} />
                    <div className="font-display font-semibold text-sm text-main">{loc}</div>
                    <div className="text-sub text-xs mt-0.5">Buka 09.00–21.00</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Metode Pembayaran */}
          {step === 2 && (
            <div>
              <h2 className="font-display font-bold text-lg text-main mb-4 flex items-center gap-2">
                <CreditCard size={20} className="text-mint-DEFAULT" /> Metode Pembayaran
              </h2>
              <div className="space-y-2">
                {PAYMENTS.map(pm => (
                  <button key={pm} onClick={() => setPayment(pm)}
                    className={`w-full flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-all ${payment === pm ? 'border-mint-DEFAULT bg-mint-DEFAULT/5 glow-mint' : 'border-[#C5F0EA] hover:border-[#A8E6DF]'}`}>
                    <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-colors ${payment === pm ? 'border-mint-DEFAULT' : 'border-[#A8E6DF]'}`}>
                      {payment === pm && <div className="w-2 h-2 rounded-full bg-mint-DEFAULT" />}
                    </div>
                    <span className="font-medium text-sm text-main">{pm}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Catatan */}
          {step === 3 && (
            <div>
              <h2 className="font-display font-bold text-lg text-main mb-2 flex items-center gap-2">
                <FileText size={20} className="text-mint-DEFAULT" /> Catatan (Opsional)
              </h2>
              <p className="text-sub text-sm mb-4">Ada permintaan khusus atau info tambahan?</p>

              {/* Summary */}
              <div className="bg-[#F0FDFB] border border-[#C5F0EA] rounded-xl p-4 mb-4 space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-sub">Paket</span><span className="text-main font-medium">{pkg.name}</span></div>
                <div className="flex justify-between"><span className="text-sub">Lokasi</span><span className="text-main font-medium">{location}</span></div>
                <div className="flex justify-between"><span className="text-sub">Pembayaran</span><span className="text-main font-medium">{payment}</span></div>
                <div className="flex justify-between border-t border-[#C5F0EA] pt-2 mt-2">
                  <span className="font-bold text-main">Total</span>
                  <span className="font-display font-bold text-mint-DEFAULT">Rp {pkg.price.toLocaleString('id-ID')}</span>
                </div>
              </div>

              <textarea value={notes} onChange={e => setNotes(e.target.value)}
                placeholder="Contoh: mau pakai backdrop warna biru, datang jam 14.00..."
                rows={4}
                className="w-full bg-[#F0FDFB] border border-[#C5F0EA] rounded-xl px-4 py-3 text-sm text-main placeholder:text-sub focus:outline-none focus:border-mint-DEFAULT transition-colors resize-none"
              />
            </div>
          )}
        </div>

        {/* Nav buttons */}
        <div className="flex gap-3 mt-6">
          {step > 0 && (
            <button onClick={() => setStep(s => s - 1)}
              className="flex items-center gap-1.5 px-5 py-2.5 border border-[#C5F0EA] rounded-xl text-sm font-medium text-main hover:border-[#A8E6DF] transition-colors">
              <ChevronLeft size={15} /> Kembali
            </button>
          )}
          <button onClick={next} disabled={!canNext()}
            className="flex-1 flex items-center justify-center gap-1.5 bg-mint-DEFAULT text-d0 font-bold text-sm py-2.5 rounded-xl hover:bg-mint-dark transition-colors glow-mint disabled:opacity-50 disabled:cursor-not-allowed">
            {step === STEPS.length - 1 ? 'Konfirmasi Booking' : 'Lanjut'} <ChevronRight size={15} />
          </button>
        </div>
      </div>
    </div>
  )
}
