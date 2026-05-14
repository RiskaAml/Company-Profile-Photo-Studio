import PhotoSlot from '../PhotoSlot'
import useReveal from '../../hooks/useReveal'

// ── ISI FOTO RUANGAN ──────────────────────────────────────────
const ROOMS = [
  { name:'White Studio',   src:'', desc:'Backdrop putih bersih untuk portrait, produk, dan konten minimalis.', tags:['Portrait','Produk','Wisuda'], tagColor:'text-sky-500 bg-sky-500/10' },
  { name:'Vintage Corner', src:'', desc:'Nuansa hangat retro dengan props estetik. Hits di semua platform.', tags:['Retro','Estetik','Couple'], tagColor:'text-amber-500 bg-amber-500/10' },
  { name:'Neon Garden',    src:'', desc:'Backdrop sage + LED warna-warni. Bold, kekinian, 100% Gen-Z.', tags:['Neon','Bold','Konten'], tagColor:'text-emerald-500 bg-emerald-500/10' },
  { name:'Dark Moodboard', src:'', desc:'Studio gelap dramatis. Perfect untuk editorial, fashion, cinematic.', tags:['Moody','Fashion','Editorial'], tagColor:'text-purple-DEFAULT bg-purple-DEFAULT/10' },
]

export default function Rooms() {
  const ref = useReveal()
  return (
    <section id="ruangan" ref={ref} className="section-y bg-white dark:bg-d1">
      <div className="container-x">
        <div className="mb-12">
          <p className="reveal text-xs font-semibold text-mint-DEFAULT uppercase tracking-widest mb-3">— Studio Rooms</p>
          <div className="reveal flex flex-col md:flex-row md:items-end justify-between gap-4">
            <h2 className="font-display font-bold text-2xl md:text-3xl text-main">4 vibes, infinite possibilities.</h2>
            <p className="text-sub text-sm max-w-xs">Pilih ruangan yang paling cocok sama konsep foto kamu.</p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {ROOMS.map((r, i) => (
            <div key={r.name}
              className="reveal group bg-zinc-50 dark:bg-d0 border border-zinc-200 dark:border-d3 rounded-2xl overflow-hidden hover:border-mint-DEFAULT/40 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md dark:hover:shadow-black/30"
              style={{ transitionDelay: `${i * 80}ms` }}>
              <div className="h-44 overflow-hidden">
                <PhotoSlot src={r.src} alt={r.name} className="w-full h-full rounded-none" />
              </div>
              <div className="p-4">
                <h3 className="font-display font-bold text-base text-main mb-1.5">{r.name}</h3>
                <p className="text-sub text-xs leading-relaxed mb-3">{r.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {r.tags.map(t => (
                    <span key={t} className={`text-xs font-semibold px-2 py-0.5 rounded-full ${r.tagColor}`}>{t}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
