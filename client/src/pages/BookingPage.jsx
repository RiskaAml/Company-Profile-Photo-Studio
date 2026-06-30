import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Check, MapPin, CreditCard, FileText, ChevronRight, ChevronLeft, Calendar } from 'lucide-react'
import { useBooking } from '../context/BookingContext'
import { useAuth } from '../context/AuthContext'

const SELF_PHOTO_PACKAGES = [
  { id: 'sp-personal', name: 'PAKET PERSONAL', price: 35000,  duration: '10 menit', persons: '1 orang' },
  { id: 'sp-couple',   name: 'PAKET COUPLE',   price: 60000,  duration: '15 menit', persons: 'Max 2 orang (laki & perempuan)' },
  { id: 'sp-1',        name: 'PAKET 1',         price: 50000,  duration: '15 menit', persons: 'Max 2 orang (bukan lawan jenis)' },
  { id: 'sp-2',        name: 'PAKET 2',         price: 60000,  duration: '15 menit', persons: 'Max 3 orang' },
  { id: 'sp-3',        name: 'PAKET 3',         price: 70000,  duration: '15 menit', persons: 'Max 5 orang' },
]

const LOCATIONS = ['Lamongan Kota', 'Bojonegoro', 'Dukun, Gresik', 'Benjeng, Gresik']
const PAYMENTS  = ['Transfer Bank', 'QRIS', 'Tunai (Bayar di Studio)', 'ShopeePay / GoPay / OVO']
const TIME_SLOTS = ['09.00', '10.00', '11.00', '12.00', '13.00', '14.00', '15.00', '16.00', '17.00', '18.00', '19.00', '20.00']
const STEPS = ['Pilih Paket', 'Tambahan', 'Pilih Lokasi', 'Tanggal & Waktu', 'Pembayaran', 'Catatan']

const BOOKED_SLOTS = {
  '2026-07-05': ['10.00', '14.00'],
  '2026-07-10': ['09.00', '11.00', '15.00'],
  '2026-07-15': ['13.00'],
}

const todayISO = new Date().toISOString().split('T')[0]
const MONTH_NAMES = ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember']
const DAY_NAMES = ['Min','Sen','Sel','Rab','Kam','Jum','Sab']

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

  const initDate = new Date()
  const [calYear, setCalYear]   = useState(initDate.getFullYear())
  const [calMonth, setCalMonth] = useState(initDate.getMonth())

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

  // Calendar helpers
  const prevMonth = () => {
    if (calMonth === 0) { setCalYear(y => y - 1); setCalMonth(11) }
    else setCalMonth(m => m - 1)
  }
  const nextMonth = () => {
    if (calMonth === 11) { setCalYear(y => y + 1); setCalMonth(0) }
    else setCalMonth(m => m + 1)
  }
  const firstDay = new Date(calYear, calMonth, 1).getDay()
  const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate()
  const calDays = [...Array(firstDay).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)]
  const toDateStr = (d) => `${calYear}-${String(calMonth + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`
  const bookedTimes = BOOKED_SLOTS[selectedDate] || []

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

        <div className="bg-white border-2 border-zinc-300 rounded-2xl p-6">

          {/* Step 0: Pilih Paket */}
          {step === 0 && (
            <div>
              <h2 className="font-display font-bold text-lg text-main mb-4 flex items-center gap-2">
                <span className="text-2xl">📸</span> Pilih Paket
              </h2>
              <div className="space-y-3">
                {SELF_PHOTO_PACKAGES.map(p => (
                  <button key={p.id} onClick={() => setSelected(p.id)}
                    className={`w-full flex items-center justify-between rounded-xl border-2 p-4 text-left transition-all
                      ${selected === p.id ? 'border-mint-DEFAULT bg-[#00E5CC]' : 'border-zinc-300 hover:border-zinc-400'}`}>
                    <div>
                      <div className="font-display font-bold text-sm text-main">{p.name}</div>
                      <div className="text-zinc-500 text-xs mt-0.5">{p.duration} · {p.persons}</div>
                    </div>
                    <div className="text-right flex-shrink-0 ml-3">
                      <div className={`font-display font-bold ${selected === p.id ? 'text-[#0A0A0F]' : 'text-mint-DEFAULT'}`}>
                        Rp {p.price.toLocaleString('id-ID')}
                      </div>
                      {selected === p.id && <Check size={16} className="text-[#0A0A0F] mt-1 ml-auto" />}
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

                <button onClick={() => toggleAddon('editFoto')}
                  className={`w-full flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-all
                    ${addons.editFoto ? 'border-mint-DEFAULT bg-[#00E5CC]' : 'border-zinc-300 hover:border-zinc-400'}`}>
                  <div className={`w-5 h-5 rounded border-2 flex-shrink-0 flex items-center justify-center transition-colors
                    ${addons.editFoto ? 'bg-[#0A0A0F] border-[#0A0A0F]' : 'border-zinc-300'}`}>
                    {addons.editFoto && <Check size={12} className="text-[#00E5CC]" />}
                  </div>
                  <div className="flex-1">
                    <span className="font-medium text-sm text-main">Tambah edit all foto</span>
                    <span className="text-zinc-500 text-xs ml-2">+Rp 25.000</span>
                  </div>
                </button>

                <button onClick={() => toggleAddon('tambahWaktu')}
                  className={`w-full flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-all
                    ${addons.tambahWaktu ? 'border-mint-DEFAULT bg-[#00E5CC]' : 'border-zinc-300 hover:border-zinc-400'}`}>
                  <div className={`w-5 h-5 rounded border-2 flex-shrink-0 flex items-center justify-center transition-colors
                    ${addons.tambahWaktu ? 'bg-[#0A0A0F] border-[#0A0A0F]' : 'border-zinc-300'}`}>
                    {addons.tambahWaktu && <Check size={12} className="text-[#00E5CC]" />}
                  </div>
                  <div className="flex-1">
                    <span className="font-medium text-sm text-main">Tambah waktu / 5 menit</span>
                    <span className="text-zinc-500 text-xs ml-2">+Rp 15.000</span>
                  </div>
                </button>

                {/* Tambahan orang — always-visible stepper */}
                <div className={`w-full flex items-center gap-3 p-4 rounded-xl border-2 transition-all
                  ${extraOrang > 0 ? 'border-mint-DEFAULT bg-[#00E5CC]' : 'border-zinc-300'}`}>
                  <div className="flex-1">
                    <span className="font-medium text-sm text-main">Tambahan orang</span>
                    <span className="text-zinc-500 text-xs ml-2">+Rp 10.000/orang</span>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button type="button" onClick={() => setExtraOrang(p => Math.max(0, p - 1))}
                      className="w-7 h-7 rounded-full border border-zinc-300 flex items-center justify-center text-main hover:border-zinc-400 font-bold bg-white">−</button>
                    <span className="w-5 text-center text-sm font-medium text-main">{extraOrang}</span>
                    <button type="button" onClick={() => setExtraOrang(p => p + 1)}
                      className="w-7 h-7 rounded-full border border-zinc-300 flex items-center justify-center text-main hover:border-zinc-400 font-bold bg-white">+</button>
                  </div>
                </div>

                <button onClick={() => toggleAddon('spotlight')}
                  className={`w-full flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-all
                    ${addons.spotlight ? 'border-mint-DEFAULT bg-[#00E5CC]' : 'border-zinc-300 hover:border-zinc-400'}`}>
                  <div className={`w-5 h-5 rounded border-2 flex-shrink-0 flex items-center justify-center transition-colors
                    ${addons.spotlight ? 'bg-[#0A0A0F] border-[#0A0A0F]' : 'border-zinc-300'}`}>
                    {addons.spotlight && <Check size={12} className="text-[#00E5CC]" />}
                  </div>
                  <div className="flex-1">
                    <span className="font-medium text-sm text-main">Spotlight</span>
                    <span className="text-zinc-500 text-xs ml-2">+Rp 20.000</span>
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
                    className={`p-4 rounded-xl border-2 text-left transition-all
                      ${location === loc ? 'border-mint-DEFAULT bg-[#00E5CC]' : 'border-zinc-300 hover:border-zinc-400'}`}>
                    <div className={`w-2 h-2 rounded-full mb-2 ${location === loc ? 'bg-[#0A0A0F]' : 'bg-zinc-400'}`} />
                    <div className="font-display font-semibold text-sm text-main">{loc}</div>
                    <div className="text-zinc-500 text-xs mt-0.5">Buka 08.20–20.00</div>
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
              <div className="grid md:grid-cols-2 gap-4">
                {/* Left: Calendar */}
                <div>
                  <p className="text-xs font-semibold text-main mb-2">Pilih Tanggal</p>
                  <div className="bg-white border-2 border-zinc-300 rounded-xl overflow-hidden">
                    {/* Calendar header */}
                    <div className="flex items-center justify-between px-3 py-2 border-b border-zinc-200 bg-zinc-50">
                      <button onClick={prevMonth} className="w-6 h-6 flex items-center justify-center rounded hover:bg-white text-main">
                        <ChevronLeft size={14} />
                      </button>
                      <span className="font-display font-bold text-xs text-main">{MONTH_NAMES[calMonth]} {calYear}</span>
                      <button onClick={nextMonth} className="w-6 h-6 flex items-center justify-center rounded hover:bg-white text-main">
                        <ChevronRight size={14} />
                      </button>
                    </div>
                    {/* Day names */}
                    <div className="grid grid-cols-7 bg-zinc-50 border-b border-zinc-200">
                      {DAY_NAMES.map(d => (
                        <div key={d} className="text-center text-[10px] font-semibold text-zinc-500 py-1">{d}</div>
                      ))}
                    </div>
                    {/* Day grid */}
                    <div className="grid grid-cols-7 p-1.5 gap-0.5 bg-white">
                      {calDays.map((d, i) => {
                        if (!d) return <div key={i} />
                        const ds = toDateStr(d)
                        const past = ds < todayISO
                        const isSelected = ds === selectedDate
                        const isToday = ds === todayISO
                        return (
                          <button key={i} disabled={past}
                            onClick={() => { setSelectedDate(ds); setSelectedTime('') }}
                            className={`w-full aspect-square rounded text-xs font-semibold flex items-center justify-center transition-all
                              ${past ? 'bg-zinc-100 text-zinc-400 border border-zinc-200 cursor-not-allowed' :
                                isSelected ? 'bg-[#00E5CC] text-[#0A0A0F] font-bold border border-[#00E5CC]' :
                                isToday ? 'border-2 border-[#A855F7] text-[#A855F7]' :
                                'border border-zinc-200 bg-white hover:bg-zinc-50 text-main'}`}>
                            {d}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                </div>

                {/* Right: Time slots */}
                <div>
                  <p className="text-xs font-semibold text-main mb-2">Pilih Jam</p>
                  <div className="grid grid-cols-3 gap-1.5">
                    {TIME_SLOTS.map(t => {
                      const isBooked = bookedTimes.includes(t)
                      const isSelected = selectedTime === t
                      return (
                        <button key={t} disabled={isBooked} onClick={() => setSelectedTime(t)}
                          className={`px-2 py-1.5 rounded-lg border-2 text-xs font-semibold transition-all
                            ${isBooked ? 'bg-zinc-100 text-zinc-400 border-zinc-200 line-through cursor-not-allowed' :
                              isSelected ? 'border-mint-DEFAULT bg-[#00E5CC] text-[#0A0A0F]' :
                              'border-zinc-300 bg-white text-main hover:border-zinc-400'}`}>
                          {t}
                        </button>
                      )
                    })}
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
                    className={`w-full flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-all
                      ${payment === pm ? 'border-mint-DEFAULT bg-[#00E5CC]' : 'border-zinc-300 hover:border-zinc-400'}`}>
                    <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-colors
                      ${payment === pm ? 'border-[#0A0A0F]' : 'border-zinc-400'}`}>
                      {payment === pm && <div className="w-2 h-2 rounded-full bg-[#0A0A0F]" />}
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

              <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-4 mb-4 space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-sub">Paket</span><span className="text-main font-medium">{pkg.name}</span></div>
                {addons.editFoto && <div className="flex justify-between"><span className="text-sub">Edit all foto</span><span className="text-main font-medium">+Rp 25.000</span></div>}
                {addons.tambahWaktu && <div className="flex justify-between"><span className="text-sub">Tambah waktu</span><span className="text-main font-medium">+Rp 15.000</span></div>}
                {extraOrang > 0 && <div className="flex justify-between"><span className="text-sub">Tambahan orang ({extraOrang}x)</span><span className="text-main font-medium">+Rp {(extraOrang * 10000).toLocaleString('id-ID')}</span></div>}
                {addons.spotlight && <div className="flex justify-between"><span className="text-sub">Spotlight</span><span className="text-main font-medium">+Rp 20.000</span></div>}
                <div className="flex justify-between"><span className="text-sub">Lokasi</span><span className="text-main font-medium">{location}</span></div>
                <div className="flex justify-between"><span className="text-sub">Tanggal</span><span className="text-main font-medium">{selectedDate}</span></div>
                <div className="flex justify-between"><span className="text-sub">Waktu</span><span className="text-main font-medium">{selectedTime} WIB</span></div>
                <div className="flex justify-between"><span className="text-sub">Pembayaran</span><span className="text-main font-medium">{payment}</span></div>
                <div className="flex justify-between border-t border-zinc-200 pt-2 mt-2">
                  <span className="font-bold text-main">Total</span>
                  <span className="font-display font-bold text-mint-DEFAULT">Rp {total.toLocaleString('id-ID')}</span>
                </div>
              </div>

              <textarea value={notes} onChange={e => setNotes(e.target.value)}
                placeholder="Contoh: mau pakai backdrop warna biru, datang jam 14.00..."
                rows={4}
                className="w-full bg-white border-2 border-zinc-300 rounded-xl px-4 py-3 text-sm text-main placeholder:text-sub focus:outline-none focus:border-mint-DEFAULT transition-colors resize-none"
              />
            </div>
          )}
        </div>

        {/* Nav buttons */}
        <div className="flex gap-3 mt-6">
          {step > 0 && (
            <button onClick={() => setStep(s => s - 1)}
              className="flex items-center gap-1.5 px-5 py-2.5 border-2 border-zinc-300 rounded-xl text-sm font-medium text-main hover:border-zinc-400 transition-colors">
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
