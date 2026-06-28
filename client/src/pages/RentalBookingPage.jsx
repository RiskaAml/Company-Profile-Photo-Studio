import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Check, Clock, MapPin, CreditCard, FileText, ChevronRight, ChevronLeft } from 'lucide-react'
import { useBooking } from '../context/BookingContext'
import { useAuth } from '../context/AuthContext'

const CAMERAS = [
  { id: 'r1', name: 'iPhone + Gimbal',   price3h: 50000,  price4h: 65000,  priceDay: 100000, img: 'rental-1.png', desc: 'iPhone 15 Pro Max + DJI OM6 Gimbal' },
  { id: 'r2', name: 'Mirrorless Basic',  price3h: 75000,  price4h: 95000,  priceDay: 150000, img: 'rental-2.png', desc: 'Sony A6400 + lensa kit 18-55mm' },
  { id: 'r3', name: 'Mirrorless Pro',    price3h: 125000, price4h: 160000, priceDay: 250000, img: 'rental-3.png', desc: 'Sony A7III + lensa 50mm f/1.8' },
  { id: 'r4', name: 'DSLR Canon',        price3h: 70000,  price4h: 90000,  priceDay: 140000, img: 'rental-4.png', desc: 'Canon EOS 200D + lensa kit' },
  { id: 'r5', name: 'Paket Lengkap',     price3h: 150000, price4h: 200000, priceDay: 350000, img: 'rental-5.png', desc: 'Mirrorless Pro + Gimbal + Lighting' },
]

const DURATIONS = [
  { id: '3h',      label: 'Per 3 Jam',  priceKey: 'price3h' },
  { id: '4h',      label: 'Per 4 Jam',  priceKey: 'price4h' },
  { id: 'fullday', label: 'Full Day',   priceKey: 'priceDay' },
]

const LOCATIONS = ['Sidoarjo Kota', 'Waru', 'Gedangan', 'Surabaya Selatan']
const PAYMENTS  = ['Transfer Bank', 'QRIS', 'Tunai (Bayar di Studio)', 'ShopeePay / GoPay / OVO']

const imgs = import.meta.glob('../assets/*.{png,jpg,jpeg,webp,svg}', { eager: true, query: '?url', import: 'default' })
const img  = (n) => imgs[`../assets/${n}`] ?? ''

const STEPS = ['Pilih Kamera', 'Pilih Durasi', 'Pilih Lokasi', 'Pembayaran', 'Catatan']

export default function RentalBookingPage() {
  const [params]   = useSearchParams()
  const preselect  = params.get('item') || 'r1'
  const navigate   = useNavigate()
  const { addBooking } = useBooking()
  const { user }   = useAuth()

  const [step, setStep]         = useState(0)
  const [selected, setSelected] = useState(preselect)
  const [duration, setDuration] = useState('')
  const [location, setLocation] = useState('')
  const [payment, setPayment]   = useState('')
  const [notes, setNotes]       = useState('')

  const cam = CAMERAS.find(c => c.id === selected) || CAMERAS[0]
  const dur = DURATIONS.find(d => d.id === duration)
  const price = dur ? cam[dur.priceKey] : 0

  const canNext = () => {
    if (step === 0) return !!selected
    if (step === 1) return !!duration
    if (step === 2) return !!location
    if (step === 3) return !!payment
    return true
  }

  const next = () => {
    if (step === STEPS.length - 1) { submit(); return }
    setStep(s => s + 1)
  }

  const submit = () => {
    const orderId = addBooking({
      type: 'Rental Kamera',
      package: `${cam.name} – ${dur?.label}`,
      price,
      location,
      payment,
      notes,
      date: new Date().toLocaleDateString('id-ID'),
      total: price,
      userName: user?.name || '',
      userEmail: user?.email || '',
    })
    navigate('/invoice', { state: { orderId, type: 'Rental Kamera', package: `${cam.name} – ${dur?.label}`, location, payment, notes, total: price, date: new Date().toLocaleDateString('id-ID') } })
  }

  return (
    <div className="min-h-screen bg-[#F0FDFB] pt-20 pb-16">
      <div className="container-x max-w-2xl">
        <h1 className="font-display font-bold text-2xl text-main mb-2">Booking Rental Kamera</h1>
        <p className="text-sub text-sm mb-8">Isi detail sewa kamera kamu di bawah ini.</p>

        {/* Step bar */}
        <div className="flex items-center gap-1 mb-8 overflow-x-auto">
          {STEPS.map((s, i) => (
            <div key={s} className="flex items-center gap-1 flex-shrink-0">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 transition-colors
                ${i < step ? 'bg-mint-DEFAULT text-d0' : i === step ? 'bg-mint-DEFAULT text-d0 ring-4 ring-mint-DEFAULT/20' : 'bg-zinc-200 text-sub'}`}>
                {i < step ? <Check size={13} /> : i + 1}
              </div>
              {i < STEPS.length - 1 && <div className={`w-6 h-px flex-shrink-0 ${i < step ? 'bg-mint-DEFAULT' : 'bg-zinc-200'}`} />}
            </div>
          ))}
          <span className="ml-2 text-xs font-medium text-main flex-shrink-0">{STEPS[step]}</span>
        </div>

        <div className="bg-white border border-[#C5F0EA] rounded-2xl p-6">

          {/* Step 0: Pilih Kamera */}
          {step === 0 && (
            <div>
              <h2 className="font-display font-bold text-lg text-main mb-4 flex items-center gap-2">
                <span className="text-2xl">📷</span> Pilih Kamera / Alat
              </h2>
              <div className="space-y-3">
                {CAMERAS.map(c => (
                  <button key={c.id} onClick={() => setSelected(c.id)}
                    className={`w-full flex items-center gap-4 rounded-xl border-2 p-4 text-left transition-all ${selected === c.id ? 'border-mint-DEFAULT bg-mint-DEFAULT/5 glow-mint' : 'border-[#C5F0EA] hover:border-[#A8E6DF]'}`}>
                    <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-[#E6FAF7]">
                      {img(c.img) ? <img src={img(c.img)} alt={c.name} loading="lazy" className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-2xl">📷</div>}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-display font-bold text-sm text-main">{c.name}</div>
                      <div className="text-sub text-xs mt-0.5">{c.desc}</div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="text-xs text-sub">mulai dari</div>
                      <div className="font-display font-bold text-mint-DEFAULT text-sm">Rp {c.price3h.toLocaleString('id-ID')}</div>
                      {selected === c.id && <Check size={16} className="text-mint-DEFAULT mt-1 ml-auto" />}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 1: Pilih Durasi */}
          {step === 1 && (
            <div>
              <h2 className="font-display font-bold text-lg text-main mb-4 flex items-center gap-2">
                <Clock size={20} className="text-mint-DEFAULT" /> Pilih Durasi Sewa
              </h2>
              <div className="bg-[#F0FDFB] rounded-xl p-3 mb-4 flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg overflow-hidden bg-[#E6FAF7] flex-shrink-0">
                  {img(cam.img) ? <img src={img(cam.img)} alt={cam.name} loading="lazy" className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-xl">📷</div>}
                </div>
                <div>
                  <div className="font-semibold text-sm text-main">{cam.name}</div>
                  <div className="text-sub text-xs">{cam.desc}</div>
                </div>
              </div>
              <div className="space-y-2">
                {DURATIONS.map(d => (
                  <button key={d.id} onClick={() => setDuration(d.id)}
                    className={`w-full flex items-center justify-between p-4 rounded-xl border-2 text-left transition-all ${duration === d.id ? 'border-mint-DEFAULT bg-mint-DEFAULT/5 glow-mint' : 'border-[#C5F0EA] hover:border-[#A8E6DF]'}`}>
                    <span className="font-medium text-sm text-main">{d.label}</span>
                    <span className="font-display font-bold text-mint-DEFAULT">Rp {cam[d.priceKey].toLocaleString('id-ID')}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Pilih Lokasi */}
          {step === 2 && (
            <div>
              <h2 className="font-display font-bold text-lg text-main mb-4 flex items-center gap-2">
                <MapPin size={20} className="text-mint-DEFAULT" /> Pilih Lokasi Pengambilan
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

          {/* Step 3: Metode Pembayaran */}
          {step === 3 && (
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

          {/* Step 4: Catatan */}
          {step === 4 && (
            <div>
              <h2 className="font-display font-bold text-lg text-main mb-2 flex items-center gap-2">
                <FileText size={20} className="text-mint-DEFAULT" /> Catatan (Opsional)
              </h2>
              <p className="text-sub text-sm mb-4">Ada permintaan khusus atau info tambahan?</p>

              {/* Summary */}
              <div className="bg-[#F0FDFB] border border-[#C5F0EA] rounded-xl p-4 mb-4 space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-sub">Kamera</span><span className="text-main font-medium">{cam.name}</span></div>
                <div className="flex justify-between"><span className="text-sub">Durasi</span><span className="text-main font-medium">{dur?.label}</span></div>
                <div className="flex justify-between"><span className="text-sub">Lokasi</span><span className="text-main font-medium">{location}</span></div>
                <div className="flex justify-between"><span className="text-sub">Pembayaran</span><span className="text-main font-medium">{payment}</span></div>
                <div className="flex justify-between border-t border-[#C5F0EA] pt-2 mt-2">
                  <span className="font-bold text-main">Total</span>
                  <span className="font-display font-bold text-mint-DEFAULT">Rp {price.toLocaleString('id-ID')}</span>
                </div>
              </div>

              <textarea value={notes} onChange={e => setNotes(e.target.value)}
                placeholder="Contoh: butuh lensa tambahan, antar ke alamat..."
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
