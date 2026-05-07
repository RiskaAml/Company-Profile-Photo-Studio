import { useEffect, useRef } from 'react'
import { Camera, Timer, Package } from 'lucide-react'

const services = [
  {
    icon: Camera,
    emoji: '🤳',
    title: 'Self Photo',
    desc: 'Studio lengkap siap pakai. Kamu yang jadi fotografer, kita sediain tempatnya. Cocok buat konten, prewedding casual, atau sekedar having fun!',
    tag: 'Paling Populer',
    color: 'bg-gold/10 border-gold/20',
    tagColor: 'bg-gold/20 text-gold',
    duration: 'Per 1 jam',
  },
  {
    icon: Camera,
    emoji: '📷',
    title: 'Photoshoot Profesional',
    desc: 'Dipotret langsung oleh fotografer berpengalaman kami. Pas buat portrait, produk, keluarga, graduation, atau momen spesial apapun.',
    tag: 'Termasuk Editing',
    color: 'bg-blush/10 border-blush/20',
    tagColor: 'bg-blush/20 text-blush',
    duration: 'Per sesi (2–3 jam)',
  },
  {
    icon: Package,
    emoji: '🎒',
    title: 'Rental Kamera',
    desc: 'Sewa kamera mirrorless atau DSLR lengkap dengan lensa pilihan. Tersedia harian dan mingguan. Sudah termasuk kartu memori.',
    tag: 'Harian / Mingguan',
    color: 'bg-sage/10 border-sage/20',
    tagColor: 'bg-sage/20 text-sage',
    duration: 'Per hari / minggu',
  },
]

export default function Services() {
  const ref = useRef(null)

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.15 }
    )
    ref.current?.querySelectorAll('.reveal').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <section id="services" ref={ref} className="py-24 px-6 bg-cream">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-14">
          <div className="reveal inline-block bg-sage/15 text-sage font-semibold text-xs px-4 py-2 rounded-full mb-4">
            Layanan Kami
          </div>
          <h2 className="reveal font-display text-4xl md:text-5xl font-700 text-charcoal leading-tight">
            Semua yang kamu <br />
            <span className="text-sage">butuhkan</span>, ada di sini
          </h2>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <div
              key={s.title}
              className={`reveal border ${s.color} rounded-3xl p-7 flex flex-col gap-4 hover:shadow-md transition-shadow duration-300`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="flex items-start justify-between">
                <span className="text-4xl">{s.emoji}</span>
                <span className={`${s.tagColor} text-xs font-semibold px-3 py-1 rounded-full`}>{s.tag}</span>
              </div>
              <div>
                <h3 className="font-display text-xl font-600 text-charcoal mb-2">{s.title}</h3>
                <p className="text-charcoal/60 text-sm leading-relaxed">{s.desc}</p>
              </div>
              <div className="mt-auto pt-4 border-t border-charcoal/10 flex items-center justify-between">
                <span className="text-xs text-charcoal/40 font-medium">{s.duration}</span>
                <a
                  href="#pricing"
                  className="text-xs font-semibold text-charcoal hover:text-gold transition-colors"
                >
                  Lihat harga →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
