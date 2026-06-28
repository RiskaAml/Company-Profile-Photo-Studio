import { useParams, Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, Check, MessageCircle, ChevronRight, Clock, Users, Camera } from 'lucide-react'
import PhotoSlot from '../components/PhotoSlot'
import Footer from '../components/Footer'
import { useAuth } from '../context/AuthContext'

const imgs = import.meta.glob('../assets/*.{png,jpg,jpeg,webp,svg}', { eager: true, query: '?url', import: 'default' })
const img  = (n) => imgs[`../assets/${n}`] ?? ''

// ── PHOTOSHOOT ─────────────────────────────────────────────────
const HOW_TO_ORDER_STEPS = [
  { step: 1, title: 'Konsultasi Konsep', desc: 'Hubungi kami via WhatsApp. Ceritakan konsep, tema, dan kebutuhan foto kamu. Kami bantu rencanakan sesi terbaik.' },
  { step: 2, title: 'Pilih Paket & Jadwal', desc: 'Pilih paket yang sesuai budget. Kami cek ketersediaan jadwal dan booking slot untuk kamu.' },
  { step: 3, title: 'Bayar DP 50%', desc: 'Transfer DP 50% untuk mengamankan slot kamu. Bisa via transfer bank, QRIS, atau e-wallet.' },
  { step: 4, title: 'Hari H — Sesi Foto', desc: 'Datang tepat waktu. Tim kami siap menyambut dan memandu seluruh sesi foto kamu.' },
  { step: 5, title: 'Terima Hasil Edit', desc: 'Foto editing selesai dalam 3–5 hari kerja, dikirim via Google Drive / WhatsApp ke kamu.' },
]

// ── SELF PHOTO ─────────────────────────────────────────────────
const SELF_PACKAGES = [
  { id: 'sp1', name: 'Paket Hemat 30 Menit', price: 75000,  duration: '30 menit', persons: '1–2 orang',     img: 'selfphoto-1.png', popular: false, features: ['Semua backdrop','Ring light','Free props'] },
  { id: 'sp2', name: 'Paket Standar 1 Jam',  price: 120000, duration: '1 jam',    persons: 'Hingga 4 orang', img: 'selfphoto-2.png', popular: true,  features: ['Semua backdrop','Ring light','Free props','Ganti outfit'] },
  { id: 'sp3', name: 'Paket Premium 2 Jam',  price: 200000, duration: '2 jam',    persons: 'Hingga 6 orang', img: 'selfphoto-3.png', popular: false, features: ['Full akses backdrop','Full akses props','Bonus 5 foto edit'] },
  { id: 'sp4', name: 'Paket Couple 1 Jam',   price: 130000, duration: '1 jam',    persons: '2 orang',        img: 'selfphoto-4.png', popular: false, features: ['Backdrop couple','Props couple','Ring light'] },
  { id: 'sp5', name: 'Paket Kelompok 3 Jam', price: 350000, duration: '3 jam',    persons: 'Hingga 10 orang',img: 'selfphoto-5.png', popular: false, features: ['Full studio access','Free props all','Bonus 10 foto edit'] },
]

// ── RENTAL ─────────────────────────────────────────────────────
const RENTAL_ITEMS = [
  { id: 'r1', name: 'iPhone + Gimbal',   price3h: 50000,  price4h: 65000,  priceDay: 100000, img: 'rental-1.png', popular: true,  desc: 'iPhone 15 Pro Max + DJI OM6 Gimbal' },
  { id: 'r2', name: 'Mirrorless Basic',  price3h: 75000,  price4h: 95000,  priceDay: 150000, img: 'rental-2.png', popular: false, desc: 'Sony A6400 + lensa kit 18-55mm' },
  { id: 'r3', name: 'Mirrorless Pro',    price3h: 125000, price4h: 160000, priceDay: 250000, img: 'rental-3.png', popular: false, desc: 'Sony A7III + lensa 50mm f/1.8' },
  { id: 'r4', name: 'DSLR Canon',        price3h: 70000,  price4h: 90000,  priceDay: 140000, img: 'rental-4.png', popular: false, desc: 'Canon EOS 200D + lensa kit' },
  { id: 'r5', name: 'Paket Lengkap',     price3h: 150000, price4h: 200000, priceDay: 350000, img: 'rental-5.png', popular: false, desc: 'Mirrorless Pro + Gimbal + Lighting' },
]

// ── PHOTOSHOOT PAGE ────────────────────────────────────────────
function PhotoshootDetail() {
  return (
    <>
      <div className="bg-[#F0FDFB] border-b border-[#C5F0EA] pt-16">
        <div className="container-x py-10">
          <Link to="/#layanan" className="inline-flex items-center gap-1.5 text-sub hover:text-main text-sm mb-6 transition-colors">
            <ArrowLeft size={15} /> Kembali
          </Link>
          <div className="flex items-center gap-3 mb-3">
            <span className="text-4xl">📷</span>
            <h1 className="font-display font-bold text-2xl md:text-3xl text-purple-DEFAULT">Photoshoot & Video</h1>
          </div>
          <p className="text-sub text-base leading-relaxed max-w-2xl">
            Dipotret atau direkam oleh fotografer/videografer profesional. Untuk portrait, produk, keluarga, graduation, prewedding, dan konten bisnis.
          </p>
        </div>
      </div>

      <div className="container-x py-12">
        {/* How to order */}
        <div className="mb-12">
          <p className="text-xs font-semibold text-mint-DEFAULT uppercase tracking-widest mb-3">— Cara Order</p>
          <h2 className="font-display font-bold text-xl md:text-2xl text-main mb-8">5 langkah mudah untuk booking.</h2>

          <div className="space-y-4">
            {HOW_TO_ORDER_STEPS.map((s, i) => (
              <div key={s.step} className="flex gap-4 items-start bg-white border border-[#C5F0EA] rounded-2xl p-5 hover:border-[#A8E6DF] transition-colors">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-mint-DEFAULT/20 to-purple-DEFAULT/20 flex items-center justify-center font-display font-bold text-mint-DEFAULT flex-shrink-0">
                  {s.step}
                </div>
                <div>
                  <div className="font-display font-bold text-sm text-main mb-1">{s.title}</div>
                  <div className="text-sub text-sm leading-relaxed">{s.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing reference */}
        <div className="mb-12">
          <p className="text-xs font-semibold text-mint-DEFAULT uppercase tracking-widest mb-3">— Referensi Harga</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: 'Mini Session', price: 150000, unit: '1 jam', icon: '🤳' },
              { name: 'Standard',     price: 300000, unit: '2 jam', icon: '📸', popular: true },
              { name: 'Family/Group', price: 500000, unit: '3 jam', icon: '👨‍👩‍👧' },
              { name: 'Video Reels',  price: 350000, unit: '2 jam', icon: '🎬' },
            ].map(p => (
              <div key={p.name} className={`border-2 rounded-2xl p-4 bg-white ${p.popular ? 'border-mint-DEFAULT glow-mint' : 'border-[#C5F0EA]'}`}>
                {p.popular && <div className="bg-mint-DEFAULT text-d0 text-xs font-bold text-center py-1 rounded-lg mb-3">⚡ Paling Populer</div>}
                <div className="text-2xl mb-2">{p.icon}</div>
                <div className="font-display font-bold text-sm text-main mb-1">{p.name}</div>
                <div className="font-display font-bold text-lg text-mint-DEFAULT">Rp {p.price.toLocaleString('id-ID')}</div>
                <div className="text-sub text-xs mt-0.5">/ {p.unit}</div>
              </div>
            ))}
          </div>
          <p className="text-sub text-xs mt-3">* Harga final ditentukan setelah konsultasi sesuai kebutuhan kamu.</p>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-purple-DEFAULT/10 to-mint-DEFAULT/10 border border-purple-DEFAULT/20 rounded-2xl p-8 text-center">
          <h3 className="font-display font-bold text-xl text-main mb-2">Siap untuk sesi foto kamu?</h3>
          <p className="text-sub text-sm mb-6 max-w-sm mx-auto">Konsultasi gratis, tanpa tekanan. Ceritakan konsep kamu dan kami bantu wujudkan.</p>
          <a href="https://wa.me/6281234567890?text=Halo%20Dolananpoto%20Studio!%20Saya%20mau%20konsultasi%20untuk%20sesi%20Photoshoot."
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-mint-DEFAULT text-d0 font-bold px-8 py-3 rounded-xl hover:bg-mint-dark transition-colors text-sm glow-mint">
            <MessageCircle size={16} /> Hubungi Kami via WhatsApp
          </a>
        </div>
      </div>
      <Footer />
    </>
  )
}

// ── SELF PHOTO PAGE ─────────────────────────────────────────────
function SelfPhotoDetail() {
  const navigate  = useNavigate()
  const { user }  = useAuth()

  const handleBook = (pkg) => {
    if (!user) { navigate('/masuk', { state: { from: `/booking/selfphoto?package=${pkg.id}` } }); return }
    navigate(`/booking/selfphoto?package=${pkg.id}`)
  }

  return (
    <>
      <div className="bg-[#F0FDFB] border-b border-[#C5F0EA] pt-16">
        <div className="container-x py-10">
          <Link to="/#layanan" className="inline-flex items-center gap-1.5 text-sub hover:text-main text-sm mb-6 transition-colors">
            <ArrowLeft size={15} /> Kembali
          </Link>
          <div className="flex items-center gap-3 mb-3">
            <span className="text-4xl">🤳</span>
            <h1 className="font-display font-bold text-2xl md:text-3xl text-mint-DEFAULT">Self Photo</h1>
          </div>
          <p className="text-sub text-base leading-relaxed max-w-2xl">
            Studio siap pakai, kamu yang jadi fotografernya. Tidak perlu skill foto khusus — studio kami dirancang agar hasilnya selalu bagus.
          </p>
        </div>
      </div>

      <div className="container-x py-12">
        <div className="mb-8">
          <p className="text-xs font-semibold text-mint-DEFAULT uppercase tracking-widest mb-2">— Katalog Paket</p>
          <h2 className="font-display font-bold text-xl md:text-2xl text-main mb-1">Pilih paket yang sesuai.</h2>
          <p className="text-sub text-sm">Harga transparan, tidak ada biaya tersembunyi ✅</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SELF_PACKAGES.map(pkg => (
            <div key={pkg.id} className={`border-2 rounded-2xl overflow-hidden bg-white transition-shadow hover:shadow-lg ${pkg.popular ? 'border-mint-DEFAULT glow-mint' : 'border-[#C5F0EA]'}`}>
              {pkg.popular && <div className="bg-mint-DEFAULT text-d0 text-xs font-bold text-center py-1.5">⚡ Paling Favorit</div>}
              <div className="h-40 overflow-hidden">
                <PhotoSlot src={img(pkg.img)} alt={pkg.name} className="w-full h-full rounded-none" />
              </div>
              <div className="p-5">
                <h3 className="font-display font-bold text-lg text-main mb-1">{pkg.name}</h3>
                <div className="flex items-center gap-3 text-xs text-sub mb-3">
                  <span className="flex items-center gap-1"><Clock size={11} /> {pkg.duration}</span>
                  <span className="flex items-center gap-1"><Users size={11} /> {pkg.persons}</span>
                </div>
                <ul className="space-y-1.5 mb-4">
                  {pkg.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-main">
                      <Check size={13} className="text-mint-DEFAULT flex-shrink-0" />{f}
                    </li>
                  ))}
                </ul>
                <div className="flex items-center justify-between mb-4 pt-3 border-t border-zinc-100">
                  <div>
                    <span className="font-display font-bold text-xl text-main">Rp {pkg.price.toLocaleString('id-ID')}</span>
                    <span className="text-sub text-xs ml-1">/ {pkg.duration}</span>
                  </div>
                </div>
                <button onClick={() => handleBook(pkg)}
                  className="w-full flex items-center justify-center gap-2 bg-[#00E5CC] text-[#0A0A0F] font-bold text-sm py-2.5 rounded-xl hover:bg-[#00B3A0] transition-colors glow-mint">
                  Booking Sekarang <ChevronRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 bg-gradient-to-r from-mint-DEFAULT/10 to-purple-DEFAULT/10 border border-mint-DEFAULT/20 rounded-2xl p-7 text-center">
          <h3 className="font-display font-bold text-lg text-main mb-2">Bingung pilih paket?</h3>
          <p className="text-sub text-sm mb-5">Konsultasi gratis, tanpa tekanan. Kami bantu pilihkan yang terbaik!</p>
          <a href="https://wa.me/6281234567890?text=Halo%20Dolananpoto%20Studio%2C%20saya%20mau%20konsultasi%20paket%20Self%20Photo!"
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-mint-DEFAULT text-d0 font-bold px-6 py-2.5 rounded-xl hover:bg-mint-dark transition-colors text-sm glow-mint">
            <MessageCircle size={15} /> Konsultasi Gratis
          </a>
        </div>
      </div>
      <Footer />
    </>
  )
}

// ── RENTAL PAGE ─────────────────────────────────────────────────
function RentalDetail() {
  const navigate = useNavigate()
  const { user } = useAuth()

  const handleRent = (item) => {
    if (!user) { navigate('/masuk', { state: { from: `/booking/rental?item=${item.id}` } }); return }
    navigate(`/booking/rental?item=${item.id}`)
  }

  return (
    <>
      <div className="bg-[#F0FDFB] border-b border-[#C5F0EA] pt-16">
        <div className="container-x py-10">
          <Link to="/#layanan" className="inline-flex items-center gap-1.5 text-sub hover:text-main text-sm mb-6 transition-colors">
            <ArrowLeft size={15} /> Kembali
          </Link>
          <div className="flex items-center gap-3 mb-3">
            <span className="text-4xl">🎒</span>
            <h1 className="font-display font-bold text-2xl md:text-3xl text-pink">Rental Kamera & iPhone</h1>
          </div>
          <p className="text-sub text-base leading-relaxed max-w-2xl">
            Sewa peralatan foto/video berkualitas. Mirrorless, DSLR, hingga iPhone terbaru + gimbal. Semua kondisi prima.
          </p>
        </div>
      </div>

      <div className="container-x py-12">
        <div className="mb-8">
          <p className="text-xs font-semibold text-pink uppercase tracking-widest mb-2">— Katalog Rental</p>
          <h2 className="font-display font-bold text-xl md:text-2xl text-main mb-1">Pilih peralatan untuk kamu sewa.</h2>
          <p className="text-sub text-sm">Tersedia per 3 jam, per 4 jam, dan full day ✅</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {RENTAL_ITEMS.map(item => (
            <div key={item.id} className={`border-2 rounded-2xl overflow-hidden bg-white transition-shadow hover:shadow-lg ${item.popular ? 'border-pink/60 shadow-pink/10' : 'border-[#C5F0EA]'}`}>
              {item.popular && <div className="bg-pink text-white text-xs font-bold text-center py-1.5">⚡ Paling Populer</div>}
              <div className="h-40 overflow-hidden">
                <PhotoSlot src={img(item.img)} alt={item.name} className="w-full h-full rounded-none" />
              </div>
              <div className="p-5">
                <div className="flex items-start gap-2 mb-2">
                  <Camera size={16} className="text-pink flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-display font-bold text-base text-main">{item.name}</h3>
                    <p className="text-sub text-xs mt-0.5">{item.desc}</p>
                  </div>
                </div>

                {/* Price variants */}
                <div className="grid grid-cols-3 gap-1.5 my-4 bg-[#F0FDFB] rounded-xl p-2">
                  {[
                    { label: '3 Jam', price: item.price3h },
                    { label: '4 Jam', price: item.price4h },
                    { label: 'Full Day', price: item.priceDay },
                  ].map(v => (
                    <div key={v.label} className="text-center p-2 rounded-lg bg-white border border-zinc-100">
                      <div className="text-xs text-sub mb-0.5">{v.label}</div>
                      <div className="font-display font-bold text-xs text-main">Rp {v.price.toLocaleString('id-ID')}</div>
                    </div>
                  ))}
                </div>

                <button onClick={() => handleRent(item)}
                  className="w-full flex items-center justify-center gap-2 bg-[#00E5CC] text-[#0A0A0F] font-bold text-sm py-2.5 rounded-xl hover:bg-[#00B3A0] transition-colors glow-mint">
                  Sewa Sekarang <ChevronRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 bg-gradient-to-r from-pink/10 to-purple-DEFAULT/10 border border-pink/20 rounded-2xl p-7 text-center">
          <h3 className="font-display font-bold text-lg text-main mb-2">Perlu rekomendasi alat?</h3>
          <p className="text-sub text-sm mb-5">Ceritakan kebutuhan kamu dan kami bantu pilih yang paling cocok.</p>
          <a href="https://wa.me/6281234567890?text=Halo%20Dolananpoto%20Studio!%20Saya%20mau%20tanya%20soal%20rental%20kamera."
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-mint-DEFAULT text-d0 font-bold px-6 py-2.5 rounded-xl hover:bg-mint-dark transition-colors text-sm glow-mint">
            <MessageCircle size={15} /> Tanya via WhatsApp
          </a>
        </div>
      </div>
      <Footer />
    </>
  )
}

// ── MAIN COMPONENT ──────────────────────────────────────────────
export default function ServiceDetail() {
  const { slug } = useParams()

  if (slug === 'photoshoot') return <PhotoshootDetail />
  if (slug === 'selfphoto')  return <SelfPhotoDetail />
  if (slug === 'rental')     return <RentalDetail />

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 pt-16">
      <p className="text-4xl">😕</p>
      <h1 className="font-display font-bold text-xl text-main">Layanan tidak ditemukan</h1>
      <Link to="/" className="text-mint-DEFAULT font-semibold hover:underline">← Kembali</Link>
    </div>
  )
}
