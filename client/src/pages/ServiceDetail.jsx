import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Check, MessageCircle } from 'lucide-react'
import Footer from '../components/Footer'

const DATA = {
  photoshoot: {
    name:'Photoshoot & Video', emoji:'📷', accent:'text-purple-DEFAULT',
    desc:'Dipotret atau direkam oleh fotografer/videografer profesional. Untuk portrait, produk, keluarga, graduation, prewedding, dan konten bisnis.',
    packages:[
      { name:'Mini Session', price:150000, unit:'per sesi (1 jam)', popular:false, desc:'Sesi singkat untuk 1 orang. Cocok untuk foto profil atau headshot.', features:['1 orang','10 foto hasil editing','Backdrop pilihan','File digital HD'] },
      { name:'Standard',     price:300000, unit:'per sesi (2 jam)', popular:true,  desc:'Sesi lengkap dengan konsultasi konsep. Untuk perorangan atau pasangan.', features:['1–2 orang','20 foto editing','2 outfit change','Konsultasi konsep gratis','File digital HD'] },
      { name:'Family/Group', price:500000, unit:'per sesi (3 jam)', popular:false, desc:'Untuk keluarga atau grup hingga 6 orang.', features:['Hingga 6 orang','30 foto editing','3 setup berbeda','Props tersedia','File digital HD'] },
      { name:'Video Reels',  price:350000, unit:'per sesi (2 jam)', popular:false, desc:'Shoot konten video untuk Reels, TikTok, atau iklan.', features:['1–2 orang','3 video clip edited','Background music','Format vertical & horizontal'] },
    ]
  },
  selfphoto: {
    name:'Self Photo', emoji:'🤳', accent:'text-mint-DEFAULT',
    desc:'Studio siap pakai, kamu yang jadi fotografernya. Tidak perlu skill foto khusus — studio kami dirancang agar hasilnya selalu bagus.',
    packages:[
      { name:'30 Menit', price:75000,  unit:'per 30 menit', popular:false, desc:'Sesi singkat untuk 1–2 orang.',         features:['1–2 orang','Semua backdrop','Ring light & lighting','Free props'] },
      { name:'1 Jam',    price:120000, unit:'per jam',       popular:true,  desc:'Sesi santai, bisa ganti outfit & backdrop.', features:['Hingga 4 orang','Semua backdrop','Ring light & lighting','Free props','Ganti outfit'] },
      { name:'2 Jam',    price:200000, unit:'per 2 jam',     popular:false, desc:'Puas-puasan untuk grup besar.',          features:['Hingga 6 orang','Full akses backdrop','Full akses props','Bonus 5 foto edit'] },
    ]
  },
  rental: {
    name:'Rental Kamera & iPhone', emoji:'🎒', accent:'text-pink',
    desc:'Sewa peralatan foto/video berkualitas. Mirrorless, DSLR, hingga iPhone terbaru + gimbal. Semua kondisi prima.',
    packages:[
      { name:'iPhone + Gimbal',  price:100000, unit:'per hari',    popular:true,  desc:'iPhone 15 Pro Max + DJI OM6 Gimbal.', features:['iPhone 15 Pro Max','DJI OM6 Gimbal','Charger & kabel','Garansi ganti unit'] },
      { name:'Mirrorless Basic', price:150000, unit:'per hari',    popular:false, desc:'Sony A6400 / Fuji X-T30 + lensa kit.',  features:['Mirrorless entry','Lensa kit 18–55mm','Memori 64GB','Battery cadangan','Tas kamera'] },
      { name:'Mirrorless Pro',   price:250000, unit:'per hari',    popular:false, desc:'Sony A7III/A7IV + lensa portrait.',      features:['Sony A7III/A7IV','Lensa 50mm f/1.8','Lensa 24–70mm','Memori 128GB','Battery x2'] },
      { name:'Weekly Package',   price:900000, unit:'per minggu',  popular:false, desc:'Hemat 40% dibanding sewa harian.',       features:['Pilihan semua unit','Hemat 40%','Antar-jemput Sidoarjo','Prioritas booking'] },
    ]
  }
}

export default function ServiceDetail() {
  const { slug } = useParams()
  const service = DATA[slug]

  if (!service) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 pt-16">
      <p className="text-4xl">😕</p>
      <h1 className="font-display font-bold text-xl text-main">Layanan tidak ditemukan</h1>
      <Link to="/" className="text-mint-DEFAULT font-semibold hover:underline">← Kembali</Link>
    </div>
  )

  return (
    <>
      <div className="bg-zinc-50 dark:bg-d0 border-b border-zinc-200 dark:border-d3 pt-16">
        <div className="container-x py-10">
          <Link to="/#layanan" className="inline-flex items-center gap-1.5 text-sub hover:text-main text-sm mb-6 transition-colors">
            <ArrowLeft size={15} /> Kembali
          </Link>
          <div className="flex items-center gap-3 mb-3">
            <span className="text-4xl">{service.emoji}</span>
            <h1 className={`font-display font-bold text-2xl md:text-3xl ${service.accent}`}>{service.name}</h1>
          </div>
          <p className="text-sub text-base leading-relaxed max-w-2xl">{service.desc}</p>
        </div>
      </div>

      <div className="container-x py-12">
        <div className="mb-8">
          <p className="text-xs font-semibold text-mint-DEFAULT uppercase tracking-widest mb-2">— Pricing</p>
          <h2 className="font-display font-bold text-xl md:text-2xl text-main mb-1">Pilih paket yang sesuai.</h2>
          <p className="text-sub text-sm">Harga transparan, tidak ada biaya tersembunyi ✅</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {service.packages.map((pkg, i) => (
            <div key={i} className={`border-2 rounded-2xl overflow-hidden bg-white dark:bg-d1 transition-shadow hover:shadow-lg dark:hover:shadow-black/30 ${pkg.popular ? 'border-mint-DEFAULT glow-mint' : 'border-zinc-200 dark:border-d3'}`}>
              {pkg.popular && <div className="bg-mint-DEFAULT text-d0 text-xs font-bold text-center py-1.5">⚡ Most Popular</div>}
              <div className="p-5">
                <h3 className="font-display font-bold text-lg text-main mb-1">{pkg.name}</h3>
                <p className="text-sub text-sm mb-4 leading-relaxed">{pkg.desc}</p>
                <div className="mb-4">
                  <span className="font-display font-bold text-2xl text-main">Rp {pkg.price.toLocaleString('id-ID')}</span>
                  <span className="text-sub text-xs ml-1">/ {pkg.unit}</span>
                </div>
                <ul className="space-y-2 mb-5">
                  {pkg.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-main/80">
                      <Check size={14} className="text-mint-DEFAULT mt-0.5 flex-shrink-0" />{f}
                    </li>
                  ))}
                </ul>
                <a href={`https://wa.me/6281234567890?text=Halo%20AF%20Studio!%20Mau%20booking%20paket%20${encodeURIComponent(pkg.name)}%20-%20${encodeURIComponent(service.name)}`}
                  target="_blank" rel="noopener noreferrer"
                  className={`w-full flex items-center justify-center gap-2 font-semibold text-sm py-2.5 rounded-xl transition-colors ${pkg.popular ? 'bg-mint-DEFAULT text-d0 hover:bg-mint-dark' : 'bg-zinc-100 dark:bg-d2 text-main hover:bg-zinc-200 dark:hover:bg-d3 border border-zinc-200 dark:border-d3'}`}>
                  <MessageCircle size={15} /> Book via WA
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 bg-gradient-to-r from-mint-DEFAULT/10 to-purple-DEFAULT/10 border border-mint-DEFAULT/20 rounded-2xl p-7 text-center">
          <h3 className="font-display font-bold text-lg text-main mb-2">Bingung pilih paket?</h3>
          <p className="text-sub text-sm mb-5">Konsultasi gratis, tanpa tekanan. Kami bantu pilihkan yang terbaik!</p>
          <a href="https://wa.me/6281234567890?text=Halo%20AF%20Studio%2C%20saya%20mau%20konsultasi%20dulu!"
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
