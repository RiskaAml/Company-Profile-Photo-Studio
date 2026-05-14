import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import PhotoSlot from '../PhotoSlot'
import useReveal from '../../hooks/useReveal'

// ── ISI FOTO PREVIEW GALERI ───────────────────────────────────
const ITEMS = [
  { id:1, title:'Casual Portrait',  cat:'Portrait',  src:'', color:'text-rose-400 bg-rose-400/10' },
  { id:2, title:'Squad Goals',      cat:'Self Photo', src:'', color:'text-sky-400 bg-sky-400/10' },
  { id:3, title:'Couple Goals',     cat:'Couple',     src:'', color:'text-purple-400 bg-purple-400/10' },
  { id:4, title:'Product Flatlay',  cat:'Produk',     src:'', color:'text-amber-400 bg-amber-400/10' },
  { id:5, title:'Graduation',       cat:'Wisuda',     src:'', color:'text-emerald-400 bg-emerald-400/10' },
  { id:6, title:'Family Session',   cat:'Keluarga',   src:'', color:'text-fuchsia-400 bg-fuchsia-400/10' },
]

export default function GalleryPreview() {
  const ref = useReveal()
  return (
    <section id="galeri" ref={ref} className="section-y bg-zinc-50 dark:bg-d0">
      <div className="container-x">
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <p className="reveal text-xs font-semibold text-mint-DEFAULT uppercase tracking-widest mb-3">— Pose Inspiration</p>
            <h2 className="reveal font-display font-bold text-2xl md:text-3xl text-main">
              Gak tau mau pose apa?<br />
              <span className="grad-text">Cek sini dulu.</span>
            </h2>
          </div>
          <Link to="/galeri" className="reveal flex items-center gap-1.5 text-mint-DEFAULT font-semibold text-sm hover:gap-2.5 transition-all flex-shrink-0">
            Lihat Semua <ArrowUpRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 auto-rows-[180px] gap-3">
          {ITEMS.map((item, i) => (
            <Link to="/galeri" key={item.id}
              className={`reveal group relative rounded-2xl overflow-hidden border border-zinc-200 dark:border-d3 hover:border-mint-DEFAULT/50 transition-all ${i === 0 ? 'row-span-2' : ''}`}
              style={{ transitionDelay: `${i * 60}ms` }}>
              <PhotoSlot src={item.src} alt={item.title} className="w-full h-full rounded-none" />
              {item.src && <div className="absolute inset-0 bg-d0/0 group-hover:bg-d0/30 transition-colors" />}
              <div className="absolute bottom-3 left-3">
                <span className={`text-xs font-bold px-2.5 py-1 rounded-lg backdrop-blur-sm bg-white/80 dark:bg-d1/80 ${item.color}`}>{item.cat}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
