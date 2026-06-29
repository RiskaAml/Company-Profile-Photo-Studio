import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Check, MapPin, CreditCard, FileText, ChevronRight, ChevronLeft, Calendar, Clock } from 'lucide-react'
import { useBooking } from '../context/BookingContext'
import { useAuth } from '../context/AuthContext'

const SELF_PHOTO_PACKAGES = [
  { id: 'sp-personal', name: 'PAKET PERSONAL', price: 35000,  duration: '10 menit', persons: '1 orang' },
  { id: 'sp-couple',   name: 'PAKET COUPLE',   price: 60000,  duration: '15 menit', persons: 'Max 2 orang (laki & perempuan)' },
  { id: 'sp-1',        name: 'PAKET 1',         price: 50000,  duration: '15 menit', persons: 'Max 2 orang (bukan lawan jenis)' },
  { id: 'sp-2',        name: 'PAKET 2',         price: 60000,  duration: '15 menit', persons: 'Max 3 orang' },
  { id: 'sp-3',        name: 'PAKET 3',         price: 70000,  duration: '15 menit', persons: 'Max 5 orang' },
]

const LOCATIONS = ['Sidoarjo Kota', 'Waru', 'Gedangan', 'Surabaya Selatan']
const PAYMENTS  = ['Transfer Bank', 'QRIS', 'Tunai (Bayar di Studio)', 'ShopeePay / GoPay / OVO']
const TIME_SLOTS = ['09.00', '10.00', '11.00', '12.00', '13.00', '14.00', '15.00', '16.00', '17.00', '18.00', '19.00', '20.00']

const STEPS = ['Pilih Paket', 'Tambahan', 'Pilih Lokasi', 'Tanggal & Waktu', 'Pembayaran', 'Catatan']

const todayISO = new Date().toISOString().split('T')[0]

export default function BookingPage() {
  const [params]     = useSearchParams()
  const preselect    = params.get('package') || 'sp-personal'
  const navigate     = useNavigate()
  const { addBooking } = useBooking()
  const { user }     = useAuth()

  const [step, setStep]               = useState(0)
  const [selected, setSelected]       = useState(preselect)
  const [addons, setAddons]           = useState({ editFoto: false, tambahWaktu: false, spotlight: false })
  const [extraOrang, setExtraOrang]   = useState(0)
  const [location, setLocation]       = useState('')
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [payment, setPayment]         = useState('')
  const [notes, setNotes]             = useState('')

  const pkg = SELF_PHOTO_PACKAGES.find(p => p.id === selected) || SELF_PHOTO_PACKAGES[0]

  const addonTotal = (addons.editFoto ? 25000 : 0) +
                     (addons.tambahWaktu ? 15000 : 0) +
                     (addons.spotlight ? 20000 : 0) +
                     (extraOrang * 10000)
  const total = pkg.price + addonTotal

  const canNext = () => {
    if (step === 0) return !!selected
    if (step === 2) return !!location
    if (step === 3) return !!selectedDate && !!selectedTime
    if (step === 4) return !!payment
    return true
  }

  const next = () => {
    if (step === STEPS.length - 1) { submit(); return }
    setStep(s => s + 1)
  }

  const submit = () => {
    const formattedDate = selectedDate
      ? new Date(selectedDate + 'T00:00:00').toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
      : new Date().toLocaleDateString('id-ID')

    const orderId = addBooking({
      type: 'Self Photo',
      package: pkg.name,
      price: total,
      location,
      payment,
      notes,
      date: formattedDate,
      total,
      userName: user?.name || '',
      userEmail: user?.email || '',
    })
    navigate('/invoice', { state: { orderId, type: 'Self Photo', package: pkg.name, location, payment, notes, total, date: formattedDate } })
  }

  const toggleAddon = (key) => setAddons(a => ({ ...a, [key]: !a[key] }))

  return (
    <div className="min-h-screen bg-[#F0FDFB] pt-20 pb-16">
      <div className="container-x max-w-2xl">
        <h1 className="font-display font-bold text-2xl text-main mb-2">Booking Self Photo</h1>
        <p className="text-sub text-sm mb-8">Isi detail booking kamu di bawah ini.</p>

        {/* Step bar */}
        <div className="flex items-center gap-1 mb-8 overflow-x-auto pb-1">
          {STEPS.map((s, i) => (
            <div key={s} className="flex items-center gap-1 flex-shrink-0">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors
                ${i < step ? 'bg-mint-DEFAULT text-[#0A0A0F]' : i === step ? 'bg-mint-DEFAULT text-[#0A0A0F] ring-4 ring-mint-DEFAULT/20' : 'bg-zinc-200 text-sub'}`}>
                {i < step ? <Check size={13} /> : i + 1}
              </div>
              <span className={`text-xs font-medium hidden sm:block whitespace-nowrap ${i === step ? 'text-main' : 'text-sub'}`}>{s}</span>
              {i < STEPS.length - 1 && <div className={`w-4 h-px flex-shrink-0 ${i < step ? 'bg-mint-DEFAULT' : 'bg-zinc-200'}`} />}
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
                    className={`w-full flex items-center justify-between rounded-xl border-2 p-4 text-left transition-all ${selected === p.id ? 'border-mint-DEFAULT bg-mint-DEFAULT/5 glow-mint' : 'border-[#C5F0EA] hover:border-[#A8E6DF]'}`}>
                    <div>
                      <div className="font-display font-bold text-sm text-main">{p.name}</div>
                      <div className="text-sub text-xs mt-0.5">{p.duration} · {p.persons}</div>
                    </div>
                    <div className="text-right flex-shrink-0 ml-3">
                      <div className="font-display font-bold text-mint-DEFAULT">Rp {p.price.toLocaleString('id-ID')}</div>
                      {selected === p.id && <Check size={16} className="text-mint-DEFAULT mt-1 ml-auto" />}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 1: Tambahan */}
          {step === 1 && (
            <div>
              <h2 className="font-display font-bold text-lg text-main mb-1 flex items-center gap-2">
                <span className="text-2xl">✨</span> Tambahan
              </h2>
              <p className="text-sub text-sm mb-4">Pilih layanan tambahan (opsional)</p>
              <div className="space-y-2 mb-5">
                {/* Edit all foto */}
                <button onClick={() => toggleAddon('editFoto')}
                  className={`w-full flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-all ${addons.editFoto ? 'border-mint-DEFAULT bg-mint-DEFAULT/5' : 'border-[#C5F0EA] hover:border-[#A8E6DF]'}`}>
                  <div className={`w-5 h-5 rounded border-2 flex-shrink-0 flex items-center justify-center transition-colors ${addons.editFoto ? 'bg-mint-DEFAULT border-mint-DEFAULT' : 'border-zinc-300'}`}>
                    {addons.editFoto && <Check size={12} className="text-[#0A0A0F]" />}
                  </div>
                  <div className="flex-1">
                    <span className="font-medium text-sm text-main">Tambah edit all foto</span>
                    <span className="text-sub text-xs ml-2">+Rp 25.000</span>
                  </div>
                </button>

                {/* Tambah waktu */}
                <button onClick={() => toggleAddon('tambahWaktu')}
                  className={`w-full flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-all ${addons.tambahWaktu ? 'border-mint-DEFAULT bg-mint-DEFAULT/5' : 'border-[#C5F0EA] hover:border-[#A8E6DF]'}`}>
                  <div className={`w-5 h-5 rounded border-2 flex-shrink-0 flex items-center justify-center transition-colors ${addons.tambahWaktu ? 'bg-mint-DEFAULT border-mint-DEFAULT' : 'border-zinc-300'}`}>
                    {addons.tambahWaktu && <Check size={12} className="text-[#0A0A0F]" />}
                  </div>
                  <div className="flex-1">
                    <span className="font-medium text-sm text-main">Tambah waktu / 5 menit</span>
                    <span className="text-sub text-xs ml-2">+Rp 15.000</span>
                  </div>
                </button>

                {/* Tambahan orang */}
                <div className={`w-full flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${extraOrang > 0 ? 'border-mint-DEFAULT bg-mint-DEFAULT/5' : 'border-[#C5F0EA]'}`}>
                  <button onClick={() => setExtraOrang(n => n > 0 ? 0 : 1)}
                    className={`w-5 h-5 rounded border-2 flex-shrink-0 flex items-center justify-center transition-colors ${extraOrang > 0 ? 'bg-mint-DEFAULT border-mint-DEFAULT' : 'border-zinc-300'}`}>
                    {extraOrang > 0 && <Check size={12} className="text-[#0A0A0F]" />}
                  </button>
                  <div className="flex-1">
                    <span className="font-medium text-sm text-main">Tambahan orang</span>
                    <span className="text-sub text-xs ml-2">+Rp 10.000/orang</span>
                  </div>
                  {extraOrang > 0 && (
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <button type="button" onClick={() => setExtraOrang(n => Math.max(0, n - 1))}
                        className="w-7 h-7 rounded-full border border-[#C5F0EA] flex items-center justify-center text-main hover:border-[#A8E6DF] font-bold">−</button>
                      <span className="w-5 text-center text-sm font-medium text-main">{extraOrang}</span>
                      <button type="button" onClick={() => setExtraOrang(n => n + 1)}
                        className="w-7 h-7 rounded-full border border-[#C5F0EA] flex items-center justify-center text-main hover:border-[#A8E6DF] font-bold">+</button>
                    </div>
                  )}
                </div>

                {/* Spotlight */}
                <button onClick={() => toggleAddon('spotlight')}
                  className={`w-full flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-all ${addons.spotlight ? 'border-mint-DEFAULT bg-mint-DEFAULT/5' : 'border-[#C5F0EA] hover:border-[#A8E6DF]'}`}>
                  <div className={`w-5 h-5 rounded border-2 flex-shrink-0 flex items-center justify-center transition-colors ${addons.spotlight ? 'bg-mint-DEFAULT border-mint-DEFAULT' : 'border-zinc-300'}`}>
                    {addons.spotlight && <Check size={12} className="text-[#0A0A0F]" />}
                  </div>
                  <div className="flex-1">
                    <span className="font-medium text-sm text-main">Spotlight</span>
                    <span className="text-sub text-xs ml-2">+Rp 20.000</span>
                  </div>
                </button>
              </div>

              {addonTotal > 0 && (
                <div className="bg-mint-DEFAULT/5 border border-mint-DEFAULT/20 rounded-xl px-4 py-3 text-sm">
                  <span className="text-sub">Total tambahan: </span>
                  <span className="font-bold text-mint-DEFAULT">+Rp {addonTotal.toLocaleString('id-ID')}</span>
                </div>
              )}
            </div>
          )}

          {/* Step 2: Pilih Lokasi */}
          {step === 2 && (
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

          {/* Step 3: Tanggal & Waktu */}
          {step === 3 && (
            <div>
              <h2 className="font-display font-bold text-lg text-main mb-4 flex items-center gap-2">
                <Calendar size={20} className="text-mint-DEFAULT" /> Tanggal &amp; Waktu
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-main mb-1.5">Pilih Tanggal</label>
                  <input
                    type="date"
                    min={todayISO}
                    value={selectedDate}
                    onChange={e => setSelectedDate(e.target.value)}
                    className="w-full bg-[#F0FDFB] border border-[#C5F0EA] rounded-xl px-4 py-2.5 text-sm text-main focus:outline-none focus:border-mint-DEFAULT transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-main mb-1.5">Pilih Waktu</label>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                    {TIME_SLOTS.map(t => (
                      <button key={t} onClick={() => setSelectedTime(t)}
                        className={`py-2.5 rounded-xl border-2 text-sm font-medium transition-all ${selectedTime === t ? 'border-mint-DEFAULT bg-mint-DEFAULT/5 text-mint-DEFAULT glow-mint' : 'border-[#C5F0EA] text-main hover:border-[#A8E6DF]'}`}>
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Metode Pembayaran */}
          {step === 4 && (
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

          {/* Step 5: Catatan */}
          {step === 5 && (
            <div>
              <h2 className="font-display font-bold text-lg text-main mb-2 flex items-center gap-2">
                <FileText size={20} className="text-mint-DEFAULT" /> Catatan (Opsional)
              </h2>
              <p className="text-sub text-sm mb-4">Ada permintaan khusus atau info tambahan?</p>

              <div className="bg-[#F0FDFB] border border-[#C5F0EA] rounded-xl p-4 mb-4 space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-sub">Paket</span><span className="text-main font-medium">{pkg.name}</span></div>
                {addons.editFoto && <div className="flex justify-between"><span className="text-sub">Edit all foto</span><span className="text-main font-medium">+Rp 25.000</span></div>}
                {addons.tambahWaktu && <div className="flex justify-between"><span className="text-sub">Tambah waktu</span><span className="text-main font-medium">+Rp 15.000</span></div>}
                {extraOrang > 0 && <div className="flex justify-between"><span className="text-sub">Tambahan orang ({extraOrang}x)</span><span className="text-main font-medium">+Rp {(extraOrang * 10000).toLocaleString('id-ID')}</span></div>}
                {addons.spotlight && <div className="flex justify-between"><span className="text-sub">Spotlight</span><span className="text-main font-medium">+Rp 20.000</span></div>}
                <div className="flex justify-between"><span className="text-sub">Lokasi</span><span className="text-main font-medium">{location}</span></div>
                <div className="flex justify-between"><span className="text-sub">Tanggal</span><span className="text-main font-medium">{selectedDate}</span></div>
                <div className="flex justify-between"><span className="text-sub">Waktu</span><span className="text-main font-medium">{selectedTime} WIB</span></div>
                <div className="flex justify-between"><span className="text-sub">Pembayaran</span><span className="text-main font-medium">{payment}</span></div>
                <div className="flex justify-between border-t border-[#C5F0EA] pt-2 mt-2">
                  <span className="font-bold text-main">Total</span>
                  <span className="font-display font-bold text-mint-DEFAULT">Rp {total.toLocaleString('id-ID')}</span>
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
            className="flex-1 flex items-center justify-center gap-1.5 bg-mint-DEFAULT text-[#0A0A0F] font-bold text-sm py-2.5 rounded-xl hover:bg-[#00B3A0] transition-colors glow-mint disabled:opacity-50 disabled:cursor-not-allowed">
            {step === STEPS.length - 1 ? 'Konfirmasi Booking' : 'Lanjut'} <ChevronRight size={15} />
          </button>
        </div>
      </div>
    </div>
  )
}
