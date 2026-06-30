import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import useReveal from '../../hooks/useReveal'

const imgs = import.meta.glob('../../assets/gallery/*.{png,jpg,jpeg,webp,svg}',
  { eager: true, query: '?url', import: 'default' })
const img = (n) => imgs[`../../assets/gallery/${n}`] ?? ''

const GALLERY = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  src: img(`gallery-${i + 1}.png`),
  title: `Foto ${i + 1}`,
})).filter(p => p.id !== 13 && p.id !== 30)

export default function GalleryPreview() {
  const ref = useReveal()
  return (
    <section id="galeri" ref={ref} className="py-8 bg-[#F0FDFB]">
      <div className="container-x">
        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="reveal font-display font-bold text-2xl md:text-3xl text-main">
              Gak tau mau pose apa?<br />
              <span className="grad-text">Cek sini dulu.</span>
            </h2>
          </div>
          <Link to="/galeri" className="reveal flex items-center gap-1.5 text-mint-DEFAULT font-semibold text-sm hover:gap-2.5 transition-all flex-shrink-0">
            Lihat Semua <ArrowUpRight size={14} />
          </Link>
        </div>

        <div className="max-h-[420px] overflow-hidden">
        <div className="columns-3 sm:columns-4 lg:columns-6 gap-2 space-y-2">
          {GALLERY.slice(0, 30).map((p, i) => (
            <Link to="/galeri" key={p.id}
              className="reveal break-inside-avoid block rounded-md overflow-hidden border-2 border-zinc-300 hover:border-[#00E5CC] transition-all hover:shadow-md"
              style={{ transitionDelay: `${i * 40}ms` }}>
              <img src={p.src} alt={p.title} className="w-full h-auto object-cover" />
            </Link>
          ))}
        </div>
        </div>
      </div>
    </section>
  )
}
