import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import PhotoSlot from '../PhotoSlot'
import useReveal from '../../hooks/useReveal'

// ── ISI FOTO LAYANAN ──────────────────────────────────────────
const SERVICES = [
  { slug:'photoshoot', name:'Photoshoot & Video', desc:'Fotografer profesional untuk portrait, produk, wisuda, prewedding, dan konten bisnis. Sudah termasuk editing.', src:'', price:'Rp 150.000', unit:'/sesi', badge:'Paling Lengkap', badgeBg:'bg-purple-DEFAULT/10 text-purple-DEFAULT border-purple-DEFAULT/20', accent:'from-purple-DEFAULT/10', dot:'bg-purple-DEFAULT' },
  { slug:'selfphoto',  name:'Self Photo',          desc:'Studio siap pakai. Kamu yang jadi fotografernya sendiri. Cocok banget untuk konten, seru-seruan, atau foto bareng.', src:'', price:'Rp 75.000', unit:'/30mnt', badge:'Terfavorit', badgeBg:'bg-mint-DEFAULT/10 text-mint-DEFAULT border-mint-DEFAULT/20', accent:'from-mint-DEFAULT/10', dot:'bg-mint-DEFAULT' },
  { slug:'rental',     name:'Rental Kamera & iPhone', desc:'Sewa mirrorless, DSLR, atau iPhone terbaru + gimbal. Semua kondisi prima, tersedia harian & mingguan.', src:'', price:'Rp 100.000', unit:'/hari', badge:'Fleksibel', badgeBg:'bg-pink/10 text-pink border-pink/20', accent:'from-pink/10', dot:'bg-pink' },
]

export default function Services() {
  const ref = useReveal()
  return (
    <section id="layanan" ref={ref} className="section-y bg-zinc-50 dark:bg-d0">
      <div className="container-x">
        <div className="mb-12">
          <p className="reveal text-xs font-semibold text-mint-DEFAULT uppercase tracking-widest mb-3">— Our Services</p>
          <div className="reveal flex flex-col md:flex-row md:items-end justify-between gap-4">
            <h2 className="font-display font-bold text-2xl md:text-3xl text-main">Semua kebutuhan visualmu,<br />satu tempat.</h2>
            <p className="text-sub text-sm max-w-xs leading-relaxed">Dari foto profesional sampai sewa kamera — semuanya tersedia dengan harga yang masuk akal.</p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {SERVICES.map((s, i) => (
            <div key={s.slug}
              className={`reveal group bg-white dark:bg-d1 border border-zinc-200 dark:border-d3 rounded-2xl overflow-hidden hover:border-zinc-300 dark:hover:border-d2 hover:shadow-lg dark:hover:shadow-black/30 transition-all duration-300 hover:-translate-y-0.5`}
              style={{ transitionDelay: `${i * 80}ms` }}>
              {/* Photo */}
              <div className="h-44 overflow-hidden relative">
                <PhotoSlot src={s.src} alt={s.name} className="w-full h-full rounded-none" />
                {/* gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-b ${s.accent} to-transparent opacity-60`} />
              </div>

              <div className="p-5">
                <div className="flex items-start justify-between gap-2 mb-3">
                  <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border ${s.badgeBg}`}>
                    <div className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
                    {s.badge}
                  </span>
                </div>
                <h3 className="font-display font-bold text-lg text-main mb-2">{s.name}</h3>
                <p className="text-sub text-sm leading-relaxed mb-5">{s.desc}</p>
                <div className="flex items-center justify-between pt-4 border-t border-zinc-100 dark:border-d3">
                  <div>
                    <span className="font-display font-bold text-main">{s.price}</span>
                    <span className="text-sub text-xs ml-1">{s.unit}</span>
                  </div>
                  <Link to={`/layanan/${s.slug}`}
                    className="flex items-center gap-1 text-mint-DEFAULT font-semibold text-sm group-hover:gap-2 transition-all">
                    Detail <ArrowUpRight size={14} />
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
