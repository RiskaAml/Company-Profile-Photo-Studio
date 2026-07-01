import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import Footer from '../components/Footer'
import CTA from '../components/sections/CTA'

const imgs = import.meta.glob('../assets/**/*.{png,jpg,jpeg,webp}',
  { eager: true, query: '?url', import: 'default' })
const getImg = (path) => imgs[`../assets/${path}`] ?? ''

const SYARAT = [
  'Minimal membawa 2 identitas asli (KTP, SIM, KK, Kartu Pelajar, dll).',
  'Pengambilan iPhone tidak bisa diwakilkan — harus sesuai identitas yang dibawa. Pengembalian boleh diwakilkan.',
  'Jaminan gabungan dengan teman diperbolehkan, asalkan keduanya hadir saat pengembalian.',
  'Menunjukkan 1–2 akun media sosial yang masih aktif (WA, FB, TikTok, dll).',
  'Bersedia difoto saat pengembalian iPhone.',
  'Silakan coba iPhone sepuasnya. Jika belum paham cara penggunaan, bisa minta diajarkan.',
  'Periksa kelengkapan iPhone sebelum meninggalkan toko.',
  'Toleransi keterlambatan pengembalian 30 menit. Lebih dari itu dikenakan denda 20% per jam dari harga sewa.',
  'Jika waktu tidak cukup, hubungi admin via WhatsApp untuk tambah jam sewa.',
  'Keep/booking iPhone wajib DP minimal Rp 50.000. Tanpa DP bisa langsung datang sesuai stok tersedia.',
  'Kerusakan akibat human error (jatuh, salah pengoperasian, terkena air, part hilang) ditanggung 100% penyewa. Kerusakan karena cacat produk tidak dikenakan biaya.',
  'Hubungi kami di WA 08565563666 jika mengalami kesulitan saat penggunaan.',
]

const CATEGORIES = [
  { key: 'jam-jaman', label: 'Sewa Jam-Jaman' },
  { key: 'harian',    label: 'Sewa Harian' },
  { key: 'aksesoris', label: 'Aksesoris iPhone' },
]

const ITEMS = [
  // JAM-JAMAN
  { id: 'iphone-x-jj', name: 'iPhone X', cat: 'jam-jaman', img: 'iphone/iphone-x.png',
    variants: [{ label: '3 Jam', price: 30000 }, { label: '6 Jam', price: 50000 }, { label: '12 Jam', price: 65000 }] },
  { id: 'iphone-xr-jj', name: 'iPhone XR', cat: 'jam-jaman', img: 'iphone/iphone-xr.png',
    variants: [{ label: '3 Jam', price: 40000 }, { label: '6 Jam', price: 60000 }, { label: '12 Jam', price: 85000 }] },
  { id: 'iphone-11-jj', name: 'iPhone 11', cat: 'jam-jaman', img: 'iphone/iphone-11.png',
    variants: [{ label: '3 Jam', price: 45000 }, { label: '6 Jam', price: 75000 }, { label: '12 Jam', price: 100000 }] },
  { id: 'iphone-11pro-jj', name: 'iPhone 11 Pro', cat: 'jam-jaman', img: 'iphone/iphone-11-pro.png',
    variants: [{ label: '3 Jam', price: 50000 }, { label: '6 Jam', price: 85000 }, { label: '12 Jam', price: 110000 }] },
  { id: 'iphone-13-jj', name: 'iPhone 13', cat: 'jam-jaman', img: 'iphone/iphone-13.png',
    variants: [{ label: '6 Jam', price: 100000 }, { label: '12 Jam', price: 140000 }] },

  // HARIAN
  { id: 'iphone-x-h', name: 'iPhone X', cat: 'harian', img: 'iphone/iphone-x.png',
    variants: [{ label: '24 Jam', price: 80000 }, { label: '1,5 Hari', price: 130000 }, { label: '2 Hari', price: 150000 }, { label: '3 Hari', price: 220000 }, { label: '5 Hari', price: 320000 }] },
  { id: 'iphone-xr-h', name: 'iPhone XR', cat: 'harian', img: 'iphone/iphone-xr.png',
    variants: [{ label: '24 Jam', price: 100000 }, { label: '1,5 Hari', price: 170000 }, { label: '2 Hari', price: 190000 }, { label: '3 Hari', price: 260000 }, { label: '5 Hari', price: 400000 }] },
  { id: 'iphone-11-h', name: 'iPhone 11', cat: 'harian', img: 'iphone/iphone-11.png',
    variants: [{ label: '24 Jam', price: 130000 }, { label: '1,5 Hari', price: 220000 }, { label: '2 Hari', price: 250000 }, { label: '3 Hari', price: 350000 }, { label: '5 Hari', price: 520000 }] },
  { id: 'iphone-11pro-h', name: 'iPhone 11 Pro', cat: 'harian', img: 'iphone/iphone-11-pro.png',
    variants: [{ label: '24 Jam', price: 140000 }, { label: '1,5 Hari', price: 230000 }, { label: '2 Hari', price: 270000 }, { label: '3 Hari', price: 370000 }, { label: '5 Hari', price: 550000 }] },
  { id: 'iphone-13-h', name: 'iPhone 13', cat: 'harian', img: 'iphone/iphone-13.png',
    variants: [{ label: '24 Jam', price: 180000 }, { label: '1,5 Hari', price: 300000 }, { label: '2 Hari', price: 330000 }, { label: '3 Hari', price: 500000 }, { label: '5 Hari', price: 700000 }] },

  // AKSESORIS
  { id: 'powerbank', name: 'Powerbank', cat: 'aksesoris', img: 'iphone-aksesoris/powerbank.png',
    variants: [{ label: '24 Jam', price: 10000 }] },
  { id: 'lensa-apexi', name: 'Lensa Apexi', cat: 'aksesoris', img: 'iphone-aksesoris/lensa-apexi.png',
    variants: [{ label: '24 Jam', price: 20000 }] },
  { id: 'tripod-iphone', name: 'Tripod', cat: 'aksesoris', img: 'iphone-aksesoris/tripod.png',
    variants: [{ label: '24 Jam', price: 15000 }] },
]

export default function RentalIphonePage() {
  const navigate = useNavigate()

  return (
    <>
      {/* Header */}
      <div className="bg-[#F0FDFB] border-b border-[#C5F0EA] pt-16">
        <div className="container-x py-10">
          <Link to="/#layanan" className="inline-flex items-center gap-1.5 text-sub hover:text-main text-sm mb-6 transition-colors">
            <ArrowLeft size={15} /> Kembali
          </Link>
          <h1 className="font-display font-bold text-2xl md:text-3xl text-main mb-2">
            Rental iPhone
          </h1>
          <p className="text-sub text-base max-w-2xl">
            Sewa iPhone untuk foto dan video konten profesional.
          </p>
        </div>
      </div>

      {/* Section 1: Syarat Sewa */}
      <div className="pt-10 overflow-hidden">
        <div className="bg-[#FFF3E0] border-l-4 border-[#E65100] py-6 px-6 md:px-10 mb-10"
          style={{ marginLeft: 'calc(-50vw + 50%)', marginRight: 'calc(-50vw + 50%)', width: '100vw' }}>
          <div className="container-x">
            <p className="text-xs font-semibold text-[#E65100] uppercase tracking-widest mb-3">— Syarat Sewa</p>
            <h2 className="font-display font-bold text-xl text-[#7B3F00] mb-4">
              Baca sebelum melanjutkan.
            </h2>
            <ol className="space-y-2 list-decimal list-inside">
              {SYARAT.map((s, i) => (
                <li key={i} className="text-[#5D2E00] text-sm leading-relaxed">{s}</li>
              ))}
            </ol>
          </div>
        </div>
      </div>

      {/* Section 2: Cara Sewa */}
      <div className="container-x pb-10">
        <p className="text-xs font-semibold text-mint-DEFAULT uppercase tracking-widest mb-3">— Cara Sewa</p>
        <div className="flex items-center gap-2 flex-wrap">
          {[
            { n: 1, label: 'Pilih iPhone',                    color: 'bg-[#00E5CC] text-[#0A0A0F]' },
            { n: 2, label: 'Klik Booking Sekarang',           color: 'bg-[#A855F7] text-white' },
            { n: 3, label: 'Lakukan pembayaran / DP',         color: 'bg-[#EC4899] text-white' },
            { n: 4, label: 'Datang ke toko sesuai jadwal',    color: 'bg-[#FACC15] text-[#0A0A0F]' },
            { n: 5, label: 'Cek WA untuk konfirmasi',         color: 'bg-[#00E5CC] text-[#0A0A0F]' },
          ].map((step, i, arr) => (
            <div key={i} className="flex items-center gap-2">
              <div className="flex items-center gap-2">
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${step.color}`}>
                  {step.n}
                </span>
                <span className="text-sm text-main">{step.label}</span>
              </div>
              {i < arr.length - 1 && <span className="text-[#00E5CC] font-bold mx-1">→</span>}
            </div>
          ))}
        </div>
      </div>

      {/* Section 3: Katalog */}
      <div className="container-x pb-16">
        <p className="text-xs font-semibold text-mint-DEFAULT uppercase tracking-widest mb-2">— Katalog</p>
        <h2 className="font-display font-bold text-xl text-main mb-8">Pilih iPhone</h2>

        {CATEGORIES.map(cat => (
          <div key={cat.key} className="mb-12">
            <h3 className="font-display font-bold text-lg text-main mb-4 pb-2 border-b-2 border-[#00E5CC]">
              {cat.label}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {ITEMS.filter(item => item.cat === cat.key).map(item => (
                <div key={item.id} className="bg-white border-2 border-zinc-300 rounded-lg overflow-hidden flex flex-col">
                  <div className="aspect-square w-full overflow-hidden">
                    {getImg(item.img)
                      ? <img src={getImg(item.img)} alt={item.name}
                          className="w-full h-full object-cover" loading="lazy" />
                      : <div className="w-full h-full bg-zinc-100 flex items-center justify-center text-zinc-400 text-xs">No Image</div>
                    }
                  </div>
                  <div className="p-3 flex flex-col flex-1">
                    <p className="text-main font-semibold text-sm mb-1">{item.name}</p>
                    <div className="flex flex-col gap-0.5 mb-3">
                      {item.variants.map((v, i) => (
                        <span key={i} className="text-[#00857A] text-xs font-medium">
                          {v.label}: Rp {v.price.toLocaleString('id-ID')}
                        </span>
                      ))}
                    </div>
                    <button
                      onClick={() => navigate(`/booking/rental-iphone?item=${item.id}`)}
                      className="mt-auto w-full bg-[#00E5CC] text-[#0A0A0F] font-bold text-xs py-2 rounded-lg hover:bg-[#00B3A0] transition-colors">
                      Booking Sekarang
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <CTA />
      <Footer />
    </>
  )
}
