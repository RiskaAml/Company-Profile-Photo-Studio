import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import PhotoSlot from '../PhotoSlot'
import useReveal from '../../hooks/useReveal'

const imgs     = import.meta.glob('../../assets/*.{png,jpg,jpeg,webp,svg}', { eager: true, query: '?url', import: 'default' })
const heroImgs = import.meta.glob('../../assets/layanan/*.{png,jpg,jpeg,webp,svg}', { eager: true, query: '?url', import: 'default' })
const img      = (n) => imgs[`../../assets/${n}`] ?? ''
const heroImg  = (n) => heroImgs[`../../assets/layanan/${n}`] ?? ''

const SERVICES = [
  {
    slug: 'photoshoot',
    name: 'Photoshoot',
    desc: 'Mulai dari Rp 150.000 · Foto profesional dengan fotografer kami.',
    src: heroImg('layanan-1.png'),
  },
  {
    slug: 'selfphoto',
    name: 'Self Studio Photo',
    desc: 'Mulai dari Rp 35.000 · Studio siap pakai, kamu yang jadi fotografernya.',
    src: heroImg('layanan-2.png'),
  },
  {
    slug: 'rental',
    name: 'Rental Kamera',
    desc: 'Mulai dari Rp 50.000 · Sewa mirrorless, DSLR, atau iPhone.',
    src: heroImg('layanan-3.png'),
  },
  {
    slug: 'video',
    name: 'Rental Iphone',
    desc: 'Produksi video konten, reels, dan iklan produk. Cocok untuk UMKM, brand, dan kreator digital yang ingin tampil profesional.',
    src: heroImg('layanan-4.png'),
  },
]

export default function Services() {
  const ref = useReveal()

  return (
    <section id="layanan" ref={ref} className="section-y bg-[#F0FDFB]">
      <div className="container-x">
        <div className="mb-12">
          <div className="reveal flex flex-col md:flex-row md:items-end justify-between gap-4">
            <h2 className="font-display font-bold text-2xl md:text-3xl text-main">4 Layanan Dolananpoto Studio</h2>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SERVICES.map((s, i) => (
            <div key={s.slug}
              className="reveal group bg-white border border-[#C5F0EA] rounded-2xl overflow-hidden hover:border-[#A8E6DF] hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
              style={{ transitionDelay: `${i * 80}ms` }}>
              <div className="aspect-square overflow-hidden relative">
                <PhotoSlot src={s.src} alt={s.name} className="w-full h-full rounded-none" />
              </div>

              <div className="p-5 flex flex-col justify-between">
                <div>
                  <h3 className="font-display font-bold text-lg text-main mb-2">{s.name}</h3>
                  <p className="text-sub text-sm leading-relaxed">{s.desc}</p>
                </div>
                <div className="mt-auto pt-4 w-full">
                  <Link
                    to={s.slug === 'selfphoto' ? '/selfphoto-harga' : `/layanan/${s.slug}`}
                    className="w-full flex items-center justify-center gap-1.5 bg-[#00E5CC] text-[#0A0A0F] font-bold text-sm px-4 py-2 rounded-xl transition-colors hover:bg-[#00B3A0]">
                    Lihat Harga <ChevronRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
