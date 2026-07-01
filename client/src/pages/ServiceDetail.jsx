import { useParams, Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, ChevronRight } from 'lucide-react'
import Footer from '../components/Footer'
import CTA from '../components/sections/CTA'

// ── RENTAL DATA ─────────────────────────────────────────────────
const rentalImgs = import.meta.glob('../assets/**/*.{png,jpg,jpeg,webp}',
  { eager: true, query: '?url', import: 'default' })
const getImg = (cat, filename) => rentalImgs[`../assets/${cat}/${filename}`] ?? ''

const SYARAT = [
  'Minimal membawa 2 identitas asli (KTP, SIM, KK, Kartu Pelajar, dll).',
  'Pengambilan kamera tidak bisa diwakilkan — harus sesuai identitas yang dibawa. Pengembalian boleh diwakilkan.',
  'Jaminan gabungan dengan teman diperbolehkan, asalkan keduanya hadir saat pengembalian.',
  'Menunjukkan 1–2 akun media sosial yang masih aktif (WA, FB, TikTok, dll).',
  'Bersedia difoto saat pengembalian kamera.',
  'Silakan coba kamera sepuasnya. Jika belum paham cara penggunaan, bisa minta diajarkan.',
  'Periksa kelengkapan kamera sebelum meninggalkan toko.',
  'Toleransi keterlambatan pengembalian 30 menit. Lebih dari itu dikenakan denda 20% per jam dari harga sewa.',
  'Jika waktu tidak cukup, hubungi admin via WhatsApp untuk tambah jam sewa.',
  'Keep/booking kamera wajib DP minimal Rp 50.000. Tanpa DP bisa langsung datang sesuai stok tersedia.',
  'Kerusakan akibat human error (jatuh, salah pengoperasian, terkena air, part hilang) ditanggung 100% penyewa. Kerusakan karena cacat produk tidak dikenakan biaya.',
  'Hubungi kami di WA 08565563666 jika mengalami kesulitan saat penggunaan.',
]

const CATEGORIES = [
  { key: 'aksesoris-audio',    label: 'Aksesoris Kamera' },
  { key: 'aksesoris-lighting', label: 'Aksesoris Lighting' },
  { key: 'alat-streaming',     label: 'Alat Streaming' },
  { key: 'canon-dslr',         label: 'Canon DSLR' },
  { key: 'drone',              label: 'Drone' },
  { key: 'fullframe',          label: 'Fullframe' },
  { key: 'jamjaman',           label: 'Jam Jaman' },
]

const ITEMS = [
  { id: 'saramonic-b1',          name: 'Saramonic B1',            cat: 'aksesoris-audio',    img: 'aksesoris-audio-1.png',
    variants: [{ label: '24 Jam', price: 50000 }] },
  { id: 'mic-tnw-a30',           name: 'Mic TNW A30',             cat: 'aksesoris-audio',    img: 'aksesoris-audio-2.png',
    variants: [{ label: '24 Jam', price: 40000 }] },
  { id: 'recorder-zoom-h1n',     name: 'Recorder Zoom H1N',       cat: 'aksesoris-audio',    img: 'aksesoris-audio-3.png',
    variants: [{ label: '24 Jam', price: 50000 }] },
  { id: 'flash-tt600',           name: 'Flash TT600',             cat: 'aksesoris-lighting', img: 'aksesoris-lighting-1.png',
    variants: [{ label: '24 Jam', price: 35000 }] },
  { id: 'flash-yongnuo',         name: 'Flash Yongnuo',           cat: 'aksesoris-lighting', img: 'aksesoris-lighting-2.png',
    variants: [{ label: '24 Jam', price: 30000 }] },
  { id: 'trigger-x1t',           name: 'Trigger X1T',             cat: 'aksesoris-lighting', img: 'aksesoris-lighting-3.png',
    variants: [{ label: '24 Jam', price: 30000 }] },
  { id: 'trigger-universal',     name: 'Trigger Universal',       cat: 'aksesoris-lighting', img: 'aksesoris-lighting-4.png',
    variants: [{ label: '24 Jam', price: 25000 }] },
  { id: 'lightstand',            name: 'Lightstand',              cat: 'aksesoris-lighting', img: 'aksesoris-lighting-5.png',
    variants: [{ label: '24 Jam', price: 10000 }] },
  { id: 'tripod',                name: 'Tripod',                  cat: 'aksesoris-lighting', img: 'aksesoris-lighting-6.png',
    variants: [{ label: '24 Jam', price: 30000 }] },
  { id: 'softbox-90cm',          name: 'Softbox 90cm',            cat: 'aksesoris-lighting', img: 'aksesoris-lighting-7.png',
    variants: [{ label: '24 Jam', price: 40000 }] },
  { id: 'lampu-sorot-hinomaru',  name: 'Lampu Sorot Hinomaru',    cat: 'aksesoris-lighting', img: 'aksesoris-lighting-8.png',
    variants: [{ label: '24 Jam', price: 15000 }] },
  { id: 'baterai-flash-charger', name: 'Baterai Flash + Charger', cat: 'aksesoris-lighting', img: 'aksesoris-lighting-9.png',
    variants: [{ label: '24 Jam', price: 20000 }] },
  { id: 'memory-card',           name: 'Memory Card',             cat: 'aksesoris-lighting', img: 'aksesoris-lighting-10.png',
    variants: [{ label: '24 Jam', price: 10000 }] },
  { id: 'atem-mini-pro',         name: 'ATEM Mini PRO',           cat: 'alat-streaming',     img: 'alat-streaming-1.png',
    variants: [{ label: '12 Jam', price: 160000 }, { label: '24 Jam', price: 180000 }] },
  { id: 'video-wireless-whdi-c1',name: 'Video Wireless WHDI C1',  cat: 'alat-streaming',     img: 'alat-streaming-2.png',
    variants: [{ label: '12 Jam', price: 85000 }, { label: '24 Jam', price: 100000 }] },
  { id: 'monitor-vitrox-dc70ii', name: 'Monitor Vitrox DC70II',   cat: 'alat-streaming',     img: 'alat-streaming-3.png',
    variants: [{ label: '12 Jam', price: 85000 }, { label: '24 Jam', price: 100000 }] },
  { id: 'paket-atem-layar',      name: 'Paket Atem + Layar',      cat: 'alat-streaming',     img: 'alat-streaming-4.png',
    variants: [{ label: '12 Jam', price: 225000 }, { label: '24 Jam', price: 250000 }] },
  { id: 'canon-1100d-kit',       name: 'Canon 1100D + Kit',       cat: 'canon-dslr',         img: 'canon-dslr-1.png',
    variants: [{ label: '24 Jam (Weekday)', price: 60000 }, { label: '24 Jam (Weekend)', price: 70000 }] },
  { id: 'canon-700d-kit',        name: 'Canon 700D + Kit',        cat: 'canon-dslr',         img: 'canon-dslr-2.png',
    variants: [{ label: '24 Jam (Weekday)', price: 80000 }, { label: '24 Jam (Weekend)', price: 90000 }] },
  { id: 'canon-1200d-kit',       name: 'Canon 1200D + Kit',       cat: 'canon-dslr',         img: 'canon-dslr-3.png',
    variants: [{ label: '24 Jam (Weekday)', price: 70000 }, { label: '24 Jam (Weekend)', price: 80000 }] },
  { id: 'canon-efek-false-color',name: 'Canon Efek False Color',  cat: 'canon-dslr',         img: 'canon-dslr-4.png',
    variants: [{ label: '24 Jam (Weekday)', price: 85000 }, { label: '24 Jam (Weekend)', price: 95000 }] },
  { id: 'canon-600d-kit',        name: 'Canon 600D + Kit',        cat: 'canon-dslr',         img: 'canon-dslr-5.png',
    variants: [{ label: '24 Jam (Weekday)', price: 75000 }, { label: '24 Jam (Weekend)', price: 85000 }] },
  { id: 'canon-60d',             name: 'Canon 60D',               cat: 'canon-dslr',         img: 'canon-dslr-6.png',
    variants: [{ label: '24 Jam (Weekday)', price: 90000 }, { label: '24 Jam (Weekend)', price: 95000 }] },
  { id: 'dji-mini-3',            name: 'DJI Mini 3',              cat: 'drone',              img: 'drone-1.png',
    variants: [{ label: '12 Jam', price: 350000 }, { label: '24 Jam', price: 400000 }] },
  { id: 'dji-spark',             name: 'DJI Spark',               cat: 'drone',              img: 'drone-2.png',
    variants: [{ label: '12 Jam', price: 250000 }, { label: '24 Jam', price: 300000 }] },
  { id: 'dji-mini-3-pilot',      name: 'DJI Mini 3 + Pilot',      cat: 'drone',              img: 'drone-3.png',
    variants: [{ label: 'Info lebih lanjut WA', price: 500000 }] },
  { id: 'sony-a7ii-bo',          name: 'Sony A7II BO',            cat: 'fullframe',          img: 'fullframe-1.png',
    variants: [{ label: '12 Jam', price: 150000 }, { label: '24 Jam', price: 175000 }] },
  { id: 'eos-canon-6d-bo',       name: 'EOS Canon 6D BO',         cat: 'fullframe',          img: 'fullframe-2.png',
    variants: [{ label: '6 Jam', price: 150000 }, { label: '12 Jam', price: 150000 }, { label: '24 Jam', price: 175000 }] },
  { id: 'eos-rp-bo',             name: 'EOS RP BO',               cat: 'fullframe',          img: 'fullframe-3.png',
    variants: [{ label: '12 Jam', price: 175000 }, { label: '24 Jam', price: 200000 }] },
  { id: 'eos-rp-adaptor',        name: 'EOS RP + Adaptor',        cat: 'fullframe',          img: 'fullframe-4.png',
    variants: [{ label: '12 Jam', price: 195000 }, { label: '24 Jam', price: 225000 }] },
  { id: 'nikon-z6-bo',           name: 'Nikon Z6 BO',             cat: 'fullframe',          img: 'fullframe-5.png',
    variants: [{ label: '12 Jam', price: 220000 }, { label: '24 Jam', price: 250000 }] },
  { id: 'nikon-z6-adaptor',      name: 'Nikon Z6 + Adaptor',      cat: 'fullframe',          img: 'fullframe-6.png',
    variants: [{ label: '12 Jam', price: 250000 }, { label: '24 Jam', price: 280000 }] },
  { id: 'canon-1200d-kit-jj',    name: 'Canon 1200D + Kit',       cat: 'jamjaman',           img: 'jamjaman-1.png',
    variants: [{ label: '3 Jam', price: 30000 }, { label: '6 Jam', price: 50000 }] },
  { id: 'canon-600d-jj',         name: 'Canon 600D',              cat: 'jamjaman',           img: 'jamjaman-2.png',
    variants: [{ label: '3 Jam', price: 30000 }, { label: '6 Jam', price: 50000 }] },
  { id: 'canon-600d-fix50mm',    name: 'Canon 600D + Fix 50mm',   cat: 'jamjaman',           img: 'jamjaman-3.png',
    variants: [{ label: '3 Jam', price: 40000 }, { label: '6 Jam', price: 60000 }] },
  { id: 'canon-efek-kit',        name: 'Canon Efek + Kit',        cat: 'jamjaman',           img: 'jamjaman-4.png',
    variants: [{ label: '3 Jam', price: 30000 }, { label: '6 Jam', price: 50000 }] },
]

// ── PHOTOSHOOT PAGE ────────────────────────────────────────────
const STUDIOS = [
  { name: 'Lamongan Kota',   address: 'Jl. Veteran No.33A',    hours: '08.20 – 20.00', maps: 'https://maps.app.goo.gl/RQAriUJ4XNEDUSKd7' },
  { name: 'Dukun, Gresik',   address: 'Jl. Raya Dukun',        hours: '08.20 – 16.30', maps: 'https://maps.app.goo.gl/skEWKSbi2rnya7DRA' },
  { name: 'Bojonegoro',      address: 'Ngumpak Dalem, Dander', hours: '08.20 – 16.30', maps: 'https://maps.app.goo.gl/w1po2BD1HQoxxhDQA' },
  { name: 'Benjeng, Gresik', address: 'Karangpundut',           hours: 'Konfirmasi WA',  maps: 'https://maps.app.goo.gl/fUmuppC5quB36MvG7' },
]

const WALKIN_STEPS  = ['Pilih lokasi studio', 'Datang sesuai jam operasional', 'Antri dan sesi dimulai', 'Foto dikirim via WA dalam 3 jam']
const KONSUL_STEPS  = ['Chat kami via WhatsApp', 'Diskusi konsep dan jadwal', 'Konfirmasi dan datang sesuai waktu', 'Foto dikirim sesuai kesepakatan']

function PhotoshootDetail() {
  return (
    <>
      {/* Header */}
      <div className="bg-[#F0FDFB] border-b border-zinc-200 pt-16">
        <div className="container-x py-10">
          <Link to="/#layanan" className="inline-flex items-center gap-1.5 text-sub hover:text-main text-sm mb-8 transition-colors">
            <ArrowLeft size={15} /> Kembali
          </Link>
          <h1 className="font-display font-bold text-3xl md:text-4xl text-main mb-3">Photoshoot & Video</h1>
          <p className="text-sub text-base leading-relaxed max-w-xl">
            Foto profesional dengan fotografer berpengalaman.
          </p>
        </div>
      </div>

      <div className="container-x py-14 space-y-16">

        {/* Section 1: Cocok untuk kamu yang... */}
        <div>
          <p className="text-xs font-semibold text-mint-DEFAULT uppercase tracking-widest mb-4">Cocok untuk kamu yang...</p>
          <ul className="space-y-3 max-w-xl">
            {[
              'Butuh foto portrait untuk personal branding atau sosmed',
              'Mau foto wisuda yang natural dan elegan',
              'Butuh foto produk untuk marketplace atau iklan',
              'Merencanakan prewedding atau wedding',
              'Mendokumentasikan event, gathering, atau acara keluarga',
            ].map(item => (
              <li key={item} className="flex items-start gap-3 text-main text-sm leading-relaxed">
                <span className="text-mint-DEFAULT font-bold mt-0.5 flex-shrink-0">—</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Section 2: Cara Pesan */}
        <div>
          <p className="text-xs font-semibold text-mint-DEFAULT uppercase tracking-widest mb-4">Cara Pesan</p>
          <div className="grid sm:grid-cols-2 gap-5">
            {/* Walk-in */}
            <div className="bg-[#0A0A0F] border border-[#252532] rounded-2xl p-6 flex flex-col">
              <div className="mb-4">
                <div className="font-display font-bold text-base text-white mb-1">Langsung Datang</div>
                <div className="text-zinc-400 text-sm">Untuk portrait, wisuda, casual</div>
              </div>
              <ol className="space-y-2.5 mb-6 flex-1">
                {WALKIN_STEPS.map((s, i) => (
                  <li key={s} className="flex items-start gap-3 text-sm text-zinc-300">
                    <span className="w-5 h-5 rounded-full bg-white/10 text-[#00E5CC] text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</span>
                    {s}
                  </li>
                ))}
              </ol>
              <a href="#lokasi-photoshoot"
                className="w-full flex items-center justify-center gap-2 bg-[#00E5CC] text-[#0A0A0F] font-bold text-sm py-2.5 rounded-xl hover:bg-[#00B3A0] transition-colors mt-4">
                Lihat Lokasi Studio
              </a>
            </div>

            {/* Konsultasi */}
            <div className="bg-[#0A0A0F] border border-[#252532] rounded-2xl p-6 flex flex-col">
              <div className="mb-4">
                <div className="font-display font-bold text-base text-white mb-1">Hubungi Kami Dulu</div>
                <div className="text-zinc-400 text-sm">Untuk prewedding, wedding, produk, event</div>
              </div>
              <ol className="space-y-2.5 mb-6 flex-1">
                {KONSUL_STEPS.map((s, i) => (
                  <li key={s} className="flex items-start gap-3 text-sm text-zinc-300">
                    <span className="w-5 h-5 rounded-full bg-white/10 text-[#00E5CC] text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</span>
                    {s}
                  </li>
                ))}
              </ol>
              <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-[#00E5CC] text-[#0A0A0F] font-bold text-sm py-2.5 rounded-xl hover:bg-[#00B3A0] transition-colors mt-4">
                Chat via WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Section 3: Lokasi & Jam Operasional */}
        <div id="lokasi-photoshoot" className="overflow-hidden">
          <div className="bg-[#FFF3E0] border-l-4 border-[#E65100] py-6 px-6 md:px-10 mb-10"
            style={{ marginLeft: 'calc(-50vw + 50%)', marginRight: 'calc(-50vw + 50%)', width: '100vw' }}>
            <div className="container-x">
              <p className="text-xs font-semibold text-[#E65100] uppercase tracking-widest mb-4">— Lokasi & Jam Operasional</p>
              <div className="space-y-3">
                {[
                  { name: 'Lamongan Kota',   hours: '08.20 – 20.00',      url: 'https://maps.app.goo.gl/RQAriUJ4XNEDUSKd7' },
                  { name: 'Dukun, Gresik',   hours: '08.20 – 16.30',      url: 'https://maps.app.goo.gl/skEWKSbi2rnya7DRA' },
                  { name: 'Bojonegoro',      hours: '08.20 – 16.30',      url: 'https://maps.app.goo.gl/w1po2BD1HQoxxhDQA' },
                  { name: 'Benjeng, Gresik', hours: 'Konfirmasi via WA',  url: 'https://maps.app.goo.gl/fUmuppC5quB36MvG7' },
                ].map((loc, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <span className="font-semibold text-[#7B3F00] text-sm w-36">{loc.name}</span>
                    <span className="text-[#5D2E00] text-sm flex-1">{loc.hours}</span>
                    <a href={loc.url} target="_blank" rel="noopener noreferrer"
                      className="text-[#E65100] text-xs font-semibold hover:underline">
                      Lihat di Maps →
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Section 4: Hubungi Kami */}
        <div>
          <p className="text-xs font-semibold text-mint-DEFAULT uppercase tracking-widest mb-2">Hubungi Kami</p>
          <p className="text-sub text-sm mb-5">Pilih cara yang paling mudah untukmu.</p>
          <div className="flex flex-wrap gap-3">
            <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer"
              className="flex flex-col gap-0.5 bg-[#00E5CC] text-[#0A0A0F] rounded-2xl px-6 py-4 hover:bg-[#00B3A0] transition-colors">
              <span className="font-display font-bold text-sm">WhatsApp</span>
              <span className="text-xs font-medium opacity-80">0812-3456-7890</span>
            </a>
            <a href="https://www.instagram.com/dolananpotostudio?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer"
              className="flex flex-col gap-0.5 bg-white border-2 border-zinc-300 rounded-2xl px-6 py-4 hover:border-zinc-400 transition-colors">
              <span className="font-display font-bold text-sm text-main">Instagram</span>
              <span className="text-xs text-sub">@dolananpoto</span>
            </a>
            <a href="https://www.tiktok.com/@seflstudiopoto_benjeng?is_from_webapp=1&sender_device=pc" target="_blank" rel="noopener noreferrer"
              className="flex flex-col gap-0.5 bg-white border-2 border-zinc-300 rounded-2xl px-6 py-4 hover:border-zinc-400 transition-colors">
              <span className="font-display font-bold text-sm text-main">TikTok</span>
              <span className="text-xs text-sub">@dolananpoto</span>
            </a>
          </div>
        </div>

      </div>
      <CTA />
      <Footer />
    </>
  )
}

// ── SELF PHOTO PAGE ─────────────────────────────────────────────
function SelfPhotoDetail() {
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
        <div className="mb-10">
          <Link to="/selfphoto-harga"
            className="inline-flex items-center gap-2 bg-[#00E5CC] text-[#0A0A0F] font-bold px-6 py-3 rounded-xl hover:bg-[#00B3A0] transition-colors text-sm glow-mint">
            Lihat Harga <ChevronRight size={15} />
          </Link>
        </div>

      </div>
      <CTA />
      <Footer />
    </>
  )
}

// ── RENTAL PAGE ─────────────────────────────────────────────────
function RentalDetail() {
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
            Rental Kamera & Alat
          </h1>
          <p className="text-sub text-base max-w-2xl">
            Sewa kamera dan peralatan foto/video profesional. Tersedia berbagai pilihan sesuai kebutuhan dan budget.
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
            { n: 1, label: 'Pilih alat',                    color: 'bg-[#00E5CC] text-[#0A0A0F]' },
            { n: 2, label: 'Klik Booking Sekarang',          color: 'bg-[#A855F7] text-white' },
            { n: 3, label: 'Lakukan pembayaran / DP',        color: 'bg-[#EC4899] text-white' },
            { n: 4, label: 'Datang ke toko sesuai jadwal',   color: 'bg-[#FACC15] text-[#0A0A0F]' },
            { n: 5, label: 'Cek WA untuk konfirmasi',        color: 'bg-[#00E5CC] text-[#0A0A0F]' },
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
        <h2 className="font-display font-bold text-xl text-main mb-8">Pilih Alat</h2>

        {CATEGORIES.map(cat => (
          <div key={cat.key} className="mb-12">
            <h3 className="font-display font-bold text-lg text-main mb-4 pb-2 border-b-2 border-[#00E5CC]">
              {cat.label}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {ITEMS.filter(item => item.cat === cat.key).map(item => (
                <div key={item.id} className="bg-white border-2 border-zinc-300 rounded-lg overflow-hidden flex flex-col">
                  <div className="aspect-square w-full overflow-hidden">
                    {getImg(item.cat, item.img)
                      ? <img src={getImg(item.cat, item.img)} alt={item.name}
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
                      onClick={() => navigate(`/booking/rental?item=${item.id}`)}
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
