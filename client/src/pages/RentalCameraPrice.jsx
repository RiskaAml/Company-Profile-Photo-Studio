import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import Footer from '../components/Footer'
import CTA from '../components/sections/CTA'
import { useAuth } from '../context/AuthContext'

const imgs = import.meta.glob('../assets/**/*.{png,jpg,jpeg,webp,svg}',
  { eager: true, query: '?url', import: 'default' })
const img = (cat, id) => imgs[`../assets/${cat}/${id}.png`] ?? ''

const SYARAT = [
  'Minimal membawa 2 identitas asli (KTP, SIM, KK, Kartu Pelajar, dll).',
  'Pengambilan kamera tidak bisa diwakilkan — harus sesuai identitas yang dibawa. Pengembalian boleh diwakilkan.',
  'Jaminan gabungan dengan teman diperbolehkan, asalkan keduanya hadir saat pengembalian.',
  'Menunjukkan 1–2 akun media sosial yang masih aktif (WA, FB, TikTok, dll).',
  'Bersedia difoto saat pengembalian kamera.',
  'Silakan coba kamera sepuasnya. Jika belum paham cara penggunaan, bisa minta diajarkan.',
  'Periksa kelengkapan kamera sebelum meninggalkan toko.',
  'Toleransi keterlambatan pengembalian: 30 menit. Lebih dari itu dikenakan denda 20% per jam dari harga sewa.',
  'Jika waktu tidak cukup, hubungi admin via WhatsApp untuk tambah jam sewa.',
  'Keep/booking kamera wajib DP minimal Rp 50.000. Tanpa DP, bisa langsung datang sesuai stok tersedia.',
  'Kerusakan akibat human error (jatuh, salah pengoperasian, terkena air, part hilang) ditanggung 100% oleh penyewa. Kerusakan karena cacat produk tidak dikenakan biaya.',
  'Hubungi kami di WA 08565563666 jika mengalami kesulitan saat penggunaan.',
]

const STEPS = [
  { label: 'Pilih alat',                    color: 'bg-[#00E5CC] text-[#0A0A0F]' },
  { label: 'Klik Booking Sekarang',          color: 'bg-[#A855F7] text-white' },
  { label: 'Lakukan pembayaran / DP',        color: 'bg-[#EC4899] text-white' },
  { label: 'Datang ke toko sesuai jadwal',   color: 'bg-[#FACC15] text-[#0A0A0F]' },
  { label: 'Cek WA untuk konfirmasi admin',  color: 'bg-[#00E5CC] text-[#0A0A0F]' },
]

const CATS = [
  { label: 'Semua',             value: 'semua' },
  { label: 'Aksesoris Kamera',  value: 'aksesoris-kamera' },
  { label: 'Aksesoris Lighting',value: 'aksesoris-lighting' },
  { label: 'Alat Streaming',    value: 'alat-streaming' },
  { label: 'Canon DSLR',        value: 'canon-dslr' },
  { label: 'Drone',             value: 'drone' },
  { label: 'Fullframe',         value: 'fullframe' },
  { label: 'Jam-Jaman',         value: 'jamjaman' },
]

const ITEMS = [
  { id: 'saramonic-b1',         name: 'Saramonic B1',            cat: 'aksesoris-kamera',
    variants: [{ label: '24 Jam', price: 50000 }] },
  { id: 'mic-tnw-a30',          name: 'Mic TNW A30',             cat: 'aksesoris-kamera',
    variants: [{ label: '24 Jam', price: 40000 }] },
  { id: 'recorder-zoom-h1n',    name: 'Recorder Zoom H1N',       cat: 'aksesoris-kamera',
    variants: [{ label: '24 Jam', price: 50000 }] },
  { id: 'flash-tt600',          name: 'Flash TT600',             cat: 'aksesoris-lighting',
    variants: [{ label: '24 Jam', price: 35000 }] },
  { id: 'flash-yongnuo',        name: 'Flash Yongnuo',           cat: 'aksesoris-lighting',
    variants: [{ label: '24 Jam', price: 30000 }] },
  { id: 'trigger-x1t',          name: 'Trigger X1T',             cat: 'aksesoris-lighting',
    variants: [{ label: '24 Jam', price: 30000 }] },
  { id: 'trigger-universal',    name: 'Trigger Universal',       cat: 'aksesoris-lighting',
    variants: [{ label: '24 Jam', price: 25000 }] },
  { id: 'lightstand',           name: 'Lightstand',              cat: 'aksesoris-lighting',
    variants: [{ label: '24 Jam', price: 10000 }] },
  { id: 'tripod',               name: 'Tripod',                  cat: 'aksesoris-lighting',
    variants: [{ label: '24 Jam', price: 30000 }] },
  { id: 'softbox-90cm',         name: 'Softbox 90cm',            cat: 'aksesoris-lighting',
    variants: [{ label: '24 Jam', price: 40000 }] },
  { id: 'lampu-sorot-hinomaru', name: 'Lampu Sorot Hinomaru',    cat: 'aksesoris-lighting',
    variants: [{ label: '24 Jam', price: 15000 }] },
  { id: 'baterai-flash-charger',name: 'Baterai Flash + Charger', cat: 'aksesoris-lighting',
    variants: [{ label: '24 Jam', price: 20000 }] },
  { id: 'memory-card',          name: 'Memory Card',             cat: 'aksesoris-lighting',
    variants: [{ label: '24 Jam', price: 10000 }] },
  { id: 'atem-mini-pro',        name: 'ATEM Mini PRO',           cat: 'alat-streaming',
    variants: [{ label: '12 Jam', price: 160000 }, { label: '24 Jam', price: 180000 }] },
  { id: 'video-wireless-whdi-c1',name: 'Video Wireless WHDI C1', cat: 'alat-streaming',
    variants: [{ label: '12 Jam', price: 85000 }, { label: '24 Jam', price: 100000 }] },
  { id: 'monitor-vitrox-dc70ii',name: 'Monitor Vitrox DC70II',   cat: 'alat-streaming',
    variants: [{ label: '12 Jam', price: 85000 }, { label: '24 Jam', price: 100000 }] },
  { id: 'paket-atem-layar',     name: 'Paket Atem + Layar',      cat: 'alat-streaming',
    variants: [{ label: '12 Jam', price: 225000 }, { label: '24 Jam', price: 250000 }] },
  { id: 'canon-1100d-kit',      name: 'Canon 1100D + Kit',       cat: 'canon-dslr',
    variants: [{ label: '24 Jam (Weekday)', price: 60000 }, { label: '24 Jam (Weekend)', price: 70000 }] },
  { id: 'canon-700d-kit',       name: 'Canon 700D + Kit',        cat: 'canon-dslr',
    variants: [{ label: '24 Jam (Weekday)', price: 80000 }, { label: '24 Jam (Weekend)', price: 90000 }] },
  { id: 'canon-1200d-kit',      name: 'Canon 1200D + Kit',       cat: 'canon-dslr',
    variants: [{ label: '24 Jam (Weekday)', price: 70000 }, { label: '24 Jam (Weekend)', price: 80000 }] },
  { id: 'canon-efek-false-color',name: 'Canon Efek False Color', cat: 'canon-dslr',
    variants: [{ label: '24 Jam (Weekday)', price: 85000 }, { label: '24 Jam (Weekend)', price: 95000 }] },
  { id: 'canon-600d-kit',       name: 'Canon 600D + Kit',        cat: 'canon-dslr',
    variants: [{ label: '24 Jam (Weekday)', price: 75000 }, { label: '24 Jam (Weekend)', price: 85000 }] },
  { id: 'canon-60d',            name: 'Canon 60D',               cat: 'canon-dslr',
    variants: [{ label: '24 Jam (Weekday)', price: 90000 }, { label: '24 Jam (Weekend)', price: 95000 }] },
  { id: 'dji-mini-3',           name: 'DJI Mini 3',              cat: 'drone',
    variants: [{ label: '12 Jam', price: 350000 }, { label: '24 Jam', price: 400000 }] },
  { id: 'dji-spark',            name: 'DJI Spark',               cat: 'drone',
    variants: [{ label: '12 Jam', price: 250000 }, { label: '24 Jam', price: 300000 }] },
  { id: 'dji-mini-3-pilot',     name: 'DJI Mini 3 + Pilot',      cat: 'drone',
    variants: [{ label: 'Info lebih lanjut WA', price: 500000 }] },
  { id: 'sony-a7ii-bo',         name: 'Sony A7II BO',            cat: 'fullframe',
    variants: [{ label: '12 Jam', price: 150000 }, { label: '24 Jam', price: 175000 }] },
  { id: 'eos-canon-6d-bo',      name: 'EOS Canon 6D BO',         cat: 'fullframe',
    variants: [{ label: '6 Jam', price: 150000 }, { label: '12 Jam', price: 150000 }, { label: '24 Jam', price: 175000 }] },
  { id: 'eos-rp-bo',            name: 'EOS RP BO',               cat: 'fullframe',
    variants: [{ label: '12 Jam', price: 175000 }, { label: '24 Jam', price: 200000 }] },
  { id: 'eos-rp-adaptor',       name: 'EOS RP + Adaptor',        cat: 'fullframe',
    variants: [{ label: '12 Jam', price: 195000 }, { label: '24 Jam', price: 225000 }] },
  { id: 'nikon-z6-bo',          name: 'Nikon Z6 BO',             cat: 'fullframe',
    variants: [{ label: '12 Jam', price: 220000 }, { label: '24 Jam', price: 250000 }] },
  { id: 'nikon-z6-adaptor',     name: 'Nikon Z6 + Adaptor',      cat: 'fullframe',
    variants: [{ label: '12 Jam', price: 250000 }, { label: '24 Jam', price: 280000 }] },
  { id: 'canon-1200d-kit-jj',   name: 'Canon 1200D + Kit',       cat: 'jamjaman',
    variants: [{ label: '3 Jam', price: 30000 }, { label: '6 Jam', price: 50000 }] },
  { id: 'canon-600d-jj',        name: 'Canon 600D',              cat: 'jamjaman',
    variants: [{ label: '3 Jam', price: 30000 }, { label: '6 Jam', price: 50000 }] },
  { id: 'canon-600d-fix50mm',   name: 'Canon 600D + Fix 50mm',   cat: 'jamjaman',
    variants: [{ label: '3 Jam', price: 40000 }, { label: '6 Jam', price: 60000 }] },
  { id: 'canon-efek-kit',       name: 'Canon Efek + Kit',        cat: 'jamjaman',
    variants: [{ label: '3 Jam', price: 30000 }, { label: '6 Jam', price: 50000 }] },
]

export default function RentalCameraPrice() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [activeCat, setActiveCat] = useState('semua')

  const handleBook = (id) => {
    if (!user) { navigate('/masuk', { state: { from: `/booking/rental?item=${id}` } }); return }
    navigate(`/booking/rental?item=${id}`)
  }

  const filtered = activeCat === 'semua' ? ITEMS : ITEMS.filter(item => item.cat === activeCat)

  return (
    <>
      <div className="min-h-screen bg-[#F0FDFB] pt-20 pb-16">
        <div className="container-x max-w-6xl">

          <Link to="/layanan/rental"
            className="inline-flex items-center gap-1.5 text-sub hover:text-main text-sm mb-8 transition-colors">
            <ArrowLeft size={15} /> Kembali
          </Link>

          <h1 className="font-display font-bold text-3xl md:text-4xl text-main mb-3">
            Rental Kamera & Alat
          </h1>
          <p className="text-sub text-base mb-14 max-w-xl">
            Sewa kamera dan peralatan foto/video profesional.
          </p>

          {/* Section 1: Syarat Sewa */}
          <div className="mb-14">
            <p className="text-xs font-semibold text-mint-DEFAULT uppercase tracking-widest mb-1">Syarat Sewa</p>
            <p className="text-sub text-sm mb-4">Baca sebelum melanjutkan booking.</p>
            <div className="bg-[#0A0A0F] border border-[#252532] rounded-2xl p-6">
              <ol className="space-y-3">
                {SYARAT.map((s, i) => (
                  <li key={i} className="flex items-start gap-3 text-white text-sm leading-relaxed">
                    <span className="text-[#00E5CC] font-bold flex-shrink-0 w-5 text-right">{i + 1}.</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* Section 2: Cara Sewa */}
          <div className="mb-14">
            <p className="text-xs font-semibold text-mint-DEFAULT uppercase tracking-widest mb-5">Cara Sewa</p>
            <div className="flex items-center flex-wrap gap-2">
              {STEPS.map((step, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="flex items-center gap-2">
                    <span className={`w-5 h-5 rounded-full ${step.color} text-xs font-bold flex items-center justify-center flex-shrink-0`}>
                      {i + 1}
                    </span>
                    <span className="text-sm text-main">{step.label}</span>
                  </div>
                  {i < STEPS.length - 1 && (
                    <span className="text-[#00E5CC] font-bold">→</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Katalog */}
          <div>
            <p className="text-xs font-semibold text-mint-DEFAULT uppercase tracking-widest mb-4">Pilih Alat</p>

            {/* Category filter tabs */}
            <div className="flex gap-2 overflow-x-auto pb-3 mb-6 scrollbar-hide">
              {CATS.map(cat => (
                <button key={cat.value} onClick={() => setActiveCat(cat.value)}
                  className={`flex-shrink-0 text-xs font-semibold px-4 py-1.5 rounded-full transition-colors
                    ${activeCat === cat.value
                      ? 'bg-[#00E5CC] text-[#0A0A0F]'
                      : 'border border-zinc-300 bg-white text-main hover:border-zinc-400'}`}>
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Items grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {filtered.map(item => {
                const imgSrc = img(item.cat, item.id)
                return (
                  <div key={item.id} className="bg-[#0A0A0F] border border-[#252532] rounded-xl p-3 flex flex-col">
                    {imgSrc
                      ? <img src={imgSrc} alt={item.name} className="w-full rounded-lg object-cover h-24" />
                      : <div className="bg-[#1A1A24] rounded-lg h-24" />
                    }
                    <div className="text-white font-semibold text-sm mt-2 mb-1 leading-snug">{item.name}</div>
                    <div className="flex flex-col gap-0.5 flex-1 mb-2">
                      {item.variants.map(v => (
                        <div key={v.label} className="text-[#00E5CC] text-xs font-medium">
                          {v.label.startsWith('Info')
                            ? v.label
                            : `${v.label}: Rp ${v.price.toLocaleString('id-ID')}`}
                        </div>
                      ))}
                    </div>
                    <button onClick={() => handleBook(item.id)}
                      className="bg-[#00E5CC] text-[#0A0A0F] font-bold text-xs py-1.5 rounded-lg w-full hover:bg-[#00B3A0] transition-colors">
                      Booking Sekarang
                    </button>
                  </div>
                )
              })}
            </div>
          </div>

        </div>
      </div>
      <CTA />
      <Footer />
    </>
  )
}
