import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, ChevronRight } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import Footer from '../components/Footer'

const SELF_PACKAGES = [
  { id: 'sp-personal', name: 'PAKET PERSONAL', duration: '10 menit', persons: '1 orang',                        price: 35000 },
  { id: 'sp-couple',   name: 'PAKET COUPLE',   duration: '15 menit', persons: 'Max 2 orang (laki & perempuan)', price: 60000 },
  { id: 'sp-1',        name: 'PAKET 1',         duration: '15 menit', persons: 'Max 2 orang (bukan lawan jenis)',price: 50000 },
  { id: 'sp-2',        name: 'PAKET 2',         duration: '15 menit', persons: 'Max 3 orang',                    price: 60000 },
  { id: 'sp-3',        name: 'PAKET 3',         duration: '15 menit', persons: 'Max 5 orang',                    price: 70000 },
]

const EXTRAS = [
  { label: 'Tambah edit all foto',    price: 25000,  suffix: '' },
  { label: 'Tambah waktu / 5 menit', price: 15000,  suffix: '' },
  { label: 'Tambahan orang',          price: 10000,  suffix: '/orang' },
  { label: 'Spotlight',               price: 20000,  suffix: '' },
]


export default function SelfPhotoPrice() {
  const navigate = useNavigate()
  const { user } = useAuth()

  const handleBook = (pkg) => {
    if (!user) {
      navigate('/masuk', { state: { from: `/booking/selfphoto?package=${pkg.id}` } })
      return
    }
    navigate(`/booking/selfphoto?package=${pkg.id}`)
  }

  return (
    <>
      <div className="min-h-screen bg-[#F0FDFB] pt-20 pb-16">
        <div className="container-x max-w-5xl">

          {/* Back */}
          <Link to="/#layanan"
            className="inline-flex items-center gap-1.5 text-sub hover:text-main text-sm mb-8 transition-colors">
            <ArrowLeft size={15} /> Kembali
          </Link>

          <div className="text-center mb-10">
            <h1 className="font-display font-bold text-3xl md:text-4xl text-main mb-6">
              List Harga Self Photo Studio
            </h1>

            <div className="mb-8">
              <p className="text-sm font-semibold text-zinc-500 uppercase tracking-widest mb-3">
                Cara Daftar
              </p>
              <div className="flex items-center justify-center gap-2 flex-wrap">
                {[
                  { label: 'Pilih paket',        bg: 'bg-[#00E5CC]', text: 'text-[#0A0A0F]' },
                  { label: 'Booking Sekarang',   bg: 'bg-[#A855F7]', text: 'text-white' },
                  { label: 'Pembayaran',          bg: 'bg-[#EC4899]', text: 'text-white' },
                  { label: 'Konfirmasi via WA',  bg: 'bg-[#FACC15]', text: 'text-[#0A0A0F]' },
                ].map((step, i, arr) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="flex items-center gap-2">
                      <span className={`w-5 h-5 rounded-full ${step.bg} ${step.text} text-xs font-bold flex items-center justify-center flex-shrink-0`}>
                        {i + 1}
                      </span>
                      <span className="text-sm text-main">{step.label}</span>
                    </div>
                    {i < arr.length - 1 && (
                      <span className="text-[#00E5CC] font-bold mx-1">→</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>



          {/* Package cards — 5 columns desktop, 2 mobile */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
            {SELF_PACKAGES.map(pkg => (
              <div key={pkg.id} className="border border-[#252532] rounded-2xl p-5 bg-[#0A0A0F] hover:border-[#3a3a4a] hover:shadow-md transition-all flex flex-col">
                <div className="font-display font-bold text-sm text-white mb-1">{pkg.name}</div>
                <div className="text-xs text-zinc-400 mb-0.5">{pkg.duration}</div>
                <div className="text-xs text-zinc-400 mb-0.5">{pkg.persons}</div>
                <div className="text-xs text-zinc-400 mb-4">Semua file dikasihkan</div>
                <div className="font-display font-bold text-xl text-[#00E5CC] mb-4 mt-auto">
                  Rp {pkg.price.toLocaleString('id-ID')}
                </div>
                <button onClick={() => handleBook(pkg)}
                  className="w-full flex items-center justify-center gap-1.5 bg-[#00E5CC] text-[#0A0A0F] font-bold text-xs py-2.5 rounded-xl hover:bg-[#00B3A0] transition-colors">
                  Booking Sekarang <ChevronRight size={12} />
                </button>
              </div>
            ))}
          </div>

          {/* Tambahan */}
          <div className="mt-10">
            <p className="font-display font-bold text-xl text-main mb-4">
              Tambahan di Luar Paket
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { name: 'Tambah Edit All Foto', price: '+Rp 25.000' },
                { name: 'Tambah Waktu / 5 Menit', price: '+Rp 15.000' },
                { name: 'Tambahan Orang', price: '+Rp 10.000/orang' },
                { name: 'Spotlight', price: '+Rp 20.000' },
              ].map((t, i) => (
                <div key={i} className="bg-[#0A0A0F] border border-[#252532]
                  rounded-2xl p-4 flex flex-col gap-2">
                  <p className="text-white text-sm font-medium">{t.name}</p>
                  <p className="font-display font-bold text-[#00E5CC] text-lg">{t.price}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
      <Footer />
    </>
  )
}
