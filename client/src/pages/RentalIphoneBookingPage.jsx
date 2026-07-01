import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Check, Clock, Calendar, MapPin, CreditCard, FileText, ChevronRight, ChevronLeft } from 'lucide-react'
import { useBooking } from '../context/BookingContext'
import { useAuth } from '../context/AuthContext'

const ITEMS = [
  // JAM-JAMAN
  { id: 'iphone-x-jj',     name: 'iPhone X',      cat: 'jam-jaman', img: 'iphone/iphone-x.png',
    variants: [{ label: '3 Jam', price: 30000 }, { label: '6 Jam', price: 50000 }, { label: '12 Jam', price: 65000 }] },
  { id: 'iphone-xr-jj',    name: 'iPhone XR',     cat: 'jam-jaman', img: 'iphone/iphone-xr.png',
    variants: [{ label: '3 Jam', price: 40000 }, { label: '6 Jam', price: 60000 }, { label: '12 Jam', price: 85000 }] },
  { id: 'iphone-11-jj',    name: 'iPhone 11',     cat: 'jam-jaman', img: 'iphone/iphone-11.png',
    variants: [{ label: '3 Jam', price: 45000 }, { label: '6 Jam', price: 75000 }, { label: '12 Jam', price: 100000 }] },
  { id: 'iphone-11pro-jj', name: 'iPhone 11 Pro', cat: 'jam-jaman', img: 'iphone/iphone-11-pro.png',
    variants: [{ label: '3 Jam', price: 50000 }, { label: '6 Jam', price: 85000 }, { label: '12 Jam', price: 110000 }] },
  { id: 'iphone-13-jj',    name: 'iPhone 13',     cat: 'jam-jaman', img: 'iphone/iphone-13.png',
    variants: [{ label: '6 Jam', price: 100000 }, { label: '12 Jam', price: 140000 }] },

  // HARIAN
  { id: 'iphone-x-h',     name: 'iPhone X',      cat: 'harian', img: 'iphone/iphone-x.png',
    variants: [{ label: '24 Jam', price: 80000 }, { label: '1,5 Hari', price: 130000 }, { label: '2 Hari', price: 150000 }, { label: '3 Hari', price: 220000 }, { label: '5 Hari', price: 320000 }] },
  { id: 'iphone-xr-h',    name: 'iPhone XR',     cat: 'harian', img: 'iphone/iphone-xr.png',
    variants: [{ label: '24 Jam', price: 100000 }, { label: '1,5 Hari', price: 170000 }, { label: '2 Hari', price: 190000 }, { label: '3 Hari', price: 260000 }, { label: '5 Hari', price: 400000 }] },
  { id: 'iphone-11-h',    name: 'iPhone 11',     cat: 'harian', img: 'iphone/iphone-11.png',
    variants: [{ label: '24 Jam', price: 130000 }, { label: '1,5 Hari', price: 220000 }, { label: '2 Hari', price: 250000 }, { label: '3 Hari', price: 350000 }, { label: '5 Hari', price: 520000 }] },
  { id: 'iphone-11pro-h', name: 'iPhone 11 Pro', cat: 'harian', img: 'iphone/iphone-11-pro.png',
    variants: [{ label: '24 Jam', price: 140000 }, { label: '1,5 Hari', price: 230000 }, { label: '2 Hari', price: 270000 }, { label: '3 Hari', price: 370000 }, { label: '5 Hari', price: 550000 }] },
  { id: 'iphone-13-h',    name: 'iPhone 13',     cat: 'harian', img: 'iphone/iphone-13.png',
    variants: [{ label: '24 Jam', price: 180000 }, { label: '1,5 Hari', price: 300000 }, { label: '2 Hari', price: 330000 }, { label: '3 Hari', price: 500000 }, { label: '5 Hari', price: 700000 }] },

  // AKSESORIS
  { id: 'powerbank',     name: 'Powerbank',   cat: 'aksesoris', img: 'iphone-aksesoris/powerbank.png',
    variants: [{ label: '24 Jam', price: 10000 }] },
  { id: 'lensa-apexi',   name: 'Lensa Apexi', cat: 'aksesoris', img: 'iphone-aksesoris/lensa-apexi.png',
    variants: [{ label: '24 Jam', price: 20000 }] },
  { id: 'tripod-iphone', name: 'Tripod',       cat: 'aksesoris', img: 'iphone-aksesoris/tripod.png',
    variants: [{ label: '24 Jam', price: 15000 }] },
]

const BOOKED_DATES = ['2026-07-05', '2026-07-12', '2026-07-20']
const BOOKED_SLOTS = {
  '2026-07-08': ['09.00', '13.00'],
  '2026-07-15': ['10.00', '14.00', '16.00'],
}
const TIME_SLOTS = ['08.00','09.00','10.00','11.00','12.00','13.00','14.00','15.00','16.00','17.00','18.00','19.00']
const DAYS = ['Min','Sen','Sel','Rab','Kam','Jum','Sab']
const MONTH_NAMES = ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember']

const LOCATIONS = ['Lamongan Kota', 'Bojonegoro', 'Dukun, Gresik', 'Benjeng, Gresik']
const PAYMENTS  = ['Transfer Bank', 'QRIS', 'Tunai (Bayar di Studio)', 'ShopeePay / GoPay / OVO']

const imgs = import.meta.glob('../assets/**/*.{png,jpg,jpeg,webp}', { eager: true, query: '?url', import: 'default' })
const getImg = (path) => imgs[`../assets/${path}`] ?? ''

const STEPS = ['Konfirmasi Alat', 'Pilih Durasi', 'Pilih Tanggal & Jam', 'Pilih Lokasi', 'Pembayaran', 'Catatan']

export default function RentalIphoneBookingPage() {
  const [searchParams] = useSearchParams()
  const itemId = searchParams.get('item') || ''
  const navigate   = useNavigate()
  const { addBooking } = useBooking()
  const { user }   = useAuth()

  const selectedItem = ITEMS.find(i => i.id === itemId) || ITEMS[0]
  const cam = selectedItem
  const itemImg = getImg(selectedItem.img || '')

  const now = new Date()
  const [step, setStep]                       = useState(0)
  const [selectedVariant, setSelectedVariant] = useState(null)
  const [calYear, setCalYear]                 = useState(now.getFullYear())
  const [calMonth, setCalMonth]               = useState(now.getMonth())
  const [selectedDate, setSelectedDate]       = useState('')
  const [selectedTime, setSelectedTime]       = useState('')
  const [location, setLocation]               = useState('')
  const [payment, setPayment]                 = useState('')
  const [notes, setNotes]                     = useState('')

  const price = selectedVariant?.price ?? 0
  const isHourly = !!selectedVariant &&
    !selectedVariant.label.startsWith('24') &&
    !selectedVariant.label.includes('Hari') &&
    !selectedVariant.label.startsWith('Info')

  const canNext = () => {
    if (step === 0) return true
    if (step === 1) return !!selectedVariant
    if (step === 2) return !!selectedDate && (isHourly ? !!selectedTime : true)
    if (step === 3) return !!location
    if (step === 4) return !!payment
    return true
  }

  const next = () => {
    if (step === STEPS.length - 1) { submit(); return }
    setStep(s => s + 1)
  }

  const submit = () => {
    const dateTimeStr = selectedDate + (selectedTime ? ` · ${selectedTime}` : '')
    const orderId = addBooking({
      type: 'Rental iPhone',
      package: `${cam.name} – ${selectedVariant?.label}`,
      price,
      location,
      payment,
      notes,
      date: dateTimeStr || new Date().toLocaleDateString('id-ID'),
      total: price,
      userName: user?.name || '',
      userEmail: user?.email || '',
    })
    navigate('/invoice', { state: {
      orderId, type: 'Rental iPhone',
      package: `${cam.name} – ${selectedVariant?.label}`,
      location, payment, notes, total: price,
      date: dateTimeStr || new Date().toLocaleDateString('id-ID'),
    }})
  }

  // Calendar helpers
  const getDaysInMonth = (y, m) => new Date(y, m + 1, 0).getDate()
  const getFirstDay    = (y, m) => new Date(y, m, 1).getDay()
  const toDateStr      = (y, m, d) => `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`
  const todayStr       = toDateStr(now.getFullYear(), now.getMonth(), now.getDate())

  const prevMonth = () => {
    if (calYear === now.getFullYear() && calMonth === now.getMonth()) return
    if (calMonth === 0) { setCalYear(y => y - 1); setCalMonth(11) }
    else setCalMonth(m => m - 1)
  }
  const nextMonth = () => {
    if (calMonth === 11) { setCalYear(y => y + 1); setCalMonth(0) }
    else setCalMonth(m => m + 1)
  }

  return (
    <div className="min-h-screen bg-[#F0FDFB] pt-20 pb-16">
      <div className="container-x max-w-2xl">
        <h1 className="font-display font-bold text-2xl text-main mb-2">Booking Rental iPhone</h1>
        <p className="text-sub text-sm mb-8">Isi detail sewa iPhone kamu di bawah ini.</p>

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

        <div className="bg-white border-2 border-zinc-300 rounded-2xl p-6">

          {/* Step 0: Konfirmasi Alat */}
          {step === 0 && (
            <div>
              <h2 className="font-display font-bold text-lg text-main mb-4">Konfirmasi Alat</h2>
              <div className="flex gap-4 items-start bg-white border-2 border-zinc-300 rounded-xl p-4">
                <div className="w-32 h-32 flex-shrink-0 rounded-lg overflow-hidden bg-zinc-100">
                  {itemImg
                    ? <img src={itemImg} alt={selectedItem.name} className="w-full h-full object-cover" />
                    : <div className="w-full h-full bg-zinc-200" />
                  }
                </div>
                <div className="flex-1">
                  <h3 className="font-display font-bold text-lg text-main mb-1">{selectedItem.name}</h3>
                  <div className="flex flex-col gap-1">
                    {selectedItem.variants.map((v, i) => (
                      <span key={i} className="text-sm text-[#00857A]">
                        {v.label}: Rp {v.price.toLocaleString('id-ID')}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <button onClick={() => navigate(-1)}
                className="mt-4 text-xs text-sub hover:text-main transition-colors">
                ← Ganti iPhone? Kembali ke katalog
              </button>
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
                  {itemImg
                    ? <img src={itemImg} alt={cam.name} loading="lazy" className="w-full h-full object-cover" />
                    : <div className="w-full h-full flex items-center justify-center text-xl">📱</div>}
                </div>
                <div className="font-semibold text-sm text-main">{cam.name}</div>
              </div>
              <div className="space-y-2">
                {selectedItem?.variants.map((v, i) => (
                  <button key={i} onClick={() => setSelectedVariant(v)}
                    className={`w-full flex items-center justify-between p-4 rounded-xl border-2 text-left transition-all
                      ${selectedVariant?.label === v.label
                        ? 'border-[#00E5CC] bg-[#00E5CC] text-[#0A0A0F]'
                        : 'border-zinc-300 bg-white text-main hover:border-zinc-400'}`}>
                    <span className="font-medium text-sm">{v.label}</span>
                    <span className={`font-display font-bold ${selectedVariant?.label === v.label ? 'text-[#0A0A0F]' : 'text-mint-DEFAULT'}`}>
                      Rp {(v.price ?? 0).toLocaleString('id-ID')}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Pilih Tanggal & Jam */}
          {step === 2 && (
            <div>
              <h2 className="font-display font-bold text-lg text-main mb-4 flex items-center gap-2">
                <Calendar size={20} className="text-mint-DEFAULT" /> Pilih Tanggal & Jam
              </h2>
              <div className="grid md:grid-cols-2 gap-4">

                {/* Calendar */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <button onClick={prevMonth}
                      className="w-7 h-7 rounded-lg border border-zinc-200 flex items-center justify-center text-sub hover:border-zinc-400 transition-colors text-sm">
                      ‹
                    </button>
                    <span className="text-sm font-semibold text-main">{MONTH_NAMES[calMonth]} {calYear}</span>
                    <button onClick={nextMonth}
                      className="w-7 h-7 rounded-lg border border-zinc-200 flex items-center justify-center text-sub hover:border-zinc-400 transition-colors text-sm">
                      ›
                    </button>
                  </div>
                  <div className="grid grid-cols-7 gap-0.5 mb-1">
                    {DAYS.map(d => (
                      <div key={d} className="text-center text-[10px] font-semibold text-sub py-1">{d}</div>
                    ))}
                  </div>
                  <div className="grid grid-cols-7 gap-0.5">
                    {Array.from({ length: getFirstDay(calYear, calMonth) }).map((_, i) => (
                      <div key={`e-${i}`} />
                    ))}
                    {Array.from({ length: getDaysInMonth(calYear, calMonth) }, (_, i) => {
                      const day = i + 1
                      const dateStr = toDateStr(calYear, calMonth, day)
                      const isPast     = dateStr < todayStr
                      const isToday    = dateStr === todayStr
                      const isSelected = dateStr === selectedDate
                      const isBooked   = BOOKED_DATES.includes(dateStr)
                      const disabled   = isPast || isBooked
                      return (
                        <button key={day} disabled={disabled}
                          onClick={() => { setSelectedDate(dateStr); setSelectedTime('') }}
                          className={`aspect-square rounded text-xs font-semibold flex items-center justify-center transition-all p-1.5
                            ${isBooked   ? 'bg-zinc-100 text-zinc-400 line-through cursor-not-allowed' :
                              isPast     ? 'bg-zinc-100 text-zinc-300 cursor-not-allowed' :
                              isSelected ? 'bg-[#00E5CC] text-[#0A0A0F] font-bold' :
                              isToday    ? 'border-2 border-[#A855F7] text-[#A855F7] bg-white' :
                                           'bg-white border border-zinc-200 hover:border-[#00E5CC] cursor-pointer text-main'}`}>
                          {day}
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Time slots */}
                <div>
                  {!selectedDate ? (
                    <p className="text-sub text-sm mt-2">Pilih tanggal terlebih dahulu.</p>
                  ) : isHourly ? (
                    <>
                      <p className="text-sm font-semibold text-main mb-3">Pilih Jam Mulai</p>
                      <div className="grid grid-cols-3 gap-1.5">
                        {TIME_SLOTS.map(t => {
                          const isBookedSlot   = (BOOKED_SLOTS[selectedDate] || []).includes(t)
                          const isSelectedSlot = selectedTime === t
                          return (
                            <button key={t} disabled={isBookedSlot}
                              onClick={() => setSelectedTime(t)}
                              className={`text-xs py-2 rounded-lg border-2 font-semibold transition-all
                                ${isBookedSlot   ? 'bg-zinc-100 text-zinc-400 line-through cursor-not-allowed border-zinc-200' :
                                  isSelectedSlot ? 'bg-[#00E5CC] text-[#0A0A0F] border-[#00E5CC]' :
                                                   'bg-white border-zinc-300 text-main hover:border-[#00E5CC]'}`}>
                              {t}
                            </button>
                          )
                        })}
                      </div>
                    </>
                  ) : (
                    <div className="mt-2 bg-zinc-50 border border-zinc-200 rounded-xl p-4">
                      <p className="text-sm text-sub">Pengambilan sesuai jam buka toko.</p>
                    </div>
                  )}
                </div>

              </div>
            </div>
          )}

          {/* Step 3: Pilih Lokasi */}
          {step === 3 && (
            <div>
              <h2 className="font-display font-bold text-lg text-main mb-4 flex items-center gap-2">
                <MapPin size={20} className="text-mint-DEFAULT" /> Pilih Lokasi Pengambilan
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {LOCATIONS.map(loc => (
                  <button key={loc} onClick={() => setLocation(loc)}
                    className={`p-4 rounded-xl border-2 text-left transition-all
                      ${location === loc
                        ? 'border-[#00E5CC] bg-[#00E5CC] text-[#0A0A0F]'
                        : 'border-zinc-300 bg-white text-main hover:border-zinc-400'}`}>
                    <div className={`w-2 h-2 rounded-full mb-2 ${location === loc ? 'bg-[#0A0A0F]' : 'bg-zinc-300'}`} />
                    <div className="font-display font-semibold text-sm">{loc}</div>
                    <div className={`text-xs mt-0.5 ${location === loc ? 'text-[#0A0A0F]/70' : 'text-sub'}`}>Buka 09.00–21.00</div>
                  </button>
                ))}
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
                      ${payment === pm
                        ? 'border-[#00E5CC] bg-[#00E5CC] text-[#0A0A0F]'
                        : 'border-zinc-300 bg-white text-main hover:border-zinc-400'}`}>
                    <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-colors
                      ${payment === pm ? 'border-[#0A0A0F]' : 'border-zinc-400'}`}>
                      {payment === pm && <div className="w-2 h-2 rounded-full bg-[#0A0A0F]" />}
                    </div>
                    <span className="font-medium text-sm">{pm}</span>
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

              {/* Summary */}
              <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-4 mb-4 space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-sub">Alat</span><span className="text-main font-medium">{cam.name}</span></div>
                <div className="flex justify-between"><span className="text-sub">Durasi</span><span className="text-main font-medium">{selectedVariant?.label}</span></div>
                <div className="flex justify-between"><span className="text-sub">Tanggal</span><span className="text-main font-medium">{selectedDate}</span></div>
                {selectedTime && (
                  <div className="flex justify-between"><span className="text-sub">Jam Mulai</span><span className="text-main font-medium">{selectedTime}</span></div>
                )}
                <div className="flex justify-between"><span className="text-sub">Lokasi</span><span className="text-main font-medium">{location}</span></div>
                <div className="flex justify-between"><span className="text-sub">Pembayaran</span><span className="text-main font-medium">{payment}</span></div>
                <div className="flex justify-between border-t border-zinc-200 pt-2 mt-2">
                  <span className="font-bold text-main">Total</span>
                  <span className="font-display font-bold text-mint-DEFAULT">Rp {(price ?? 0).toLocaleString('id-ID')}</span>
                </div>
              </div>

              <textarea value={notes} onChange={e => setNotes(e.target.value)}
                placeholder="Contoh: butuh aksesoris tambahan, antar ke alamat..."
                rows={4}
                className="w-full bg-white border-2 border-zinc-300 rounded-xl px-4 py-3 text-sm text-main placeholder:text-sub focus:outline-none focus:border-[#00E5CC] transition-colors resize-none"
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
            className="flex-1 flex items-center justify-center gap-1.5 bg-mint-DEFAULT text-d0 font-bold text-sm py-2.5 rounded-xl hover:bg-mint-dark transition-colors glow-mint disabled:opacity-50 disabled:cursor-not-allowed">
            {step === STEPS.length - 1 ? 'Konfirmasi Booking' : 'Lanjut'} <ChevronRight size={15} />
          </button>
        </div>
      </div>
    </div>
  )
}
