import { useEffect, useRef } from 'react'

const items = [
  { label: 'Portrait', emoji: '🧍', bg: 'from-blush/40 to-blush/10', span: 'md:col-span-1 md:row-span-2' },
  { label: 'Couple', emoji: '👫', bg: 'from-sage/30 to-sage/10', span: '' },
  { label: 'Family', emoji: '👨‍👩‍👧', bg: 'from-sky/40 to-sky/10', span: '' },
  { label: 'Product', emoji: '📦', bg: 'from-gold/30 to-gold/10', span: 'md:col-span-2' },
  { label: 'Graduation', emoji: '🎓', bg: 'from-blush/30 to-cream', span: '' },
  { label: 'Self Photo', emoji: '🤳', bg: 'from-sage/40 to-cream', span: '' },
]

export default function Portfolio() {
  const ref = useRef(null)

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.1 }
    )
    ref.current?.querySelectorAll('.reveal').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <section id="portfolio" ref={ref} className="py-24 px-6 bg-charcoal">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="reveal inline-block bg-gold/20 text-gold font-semibold text-xs px-4 py-2 rounded-full mb-4">
              Portofolio
            </div>
            <h2 className="reveal font-display text-4xl md:text-5xl font-700 text-cream leading-tight">
              Karya yang <br />
              <span className="text-gold">berbicara</span> sendiri
            </h2>
          </div>
          <p className="reveal text-cream/50 text-sm max-w-xs leading-relaxed">
            Setiap foto adalah cerita. Ini sebagian kecil dari momen yang sudah kami abadikan bersama klien kami.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 auto-rows-[200px] gap-4">
          {items.map((item, i) => (
            <div
              key={item.label}
              className={`reveal ${item.span} bg-gradient-to-br ${item.bg} rounded-2xl flex flex-col items-center justify-center gap-3 cursor-pointer hover:scale-[1.02] transition-transform duration-300 overflow-hidden relative group`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <span className="text-5xl group-hover:scale-110 transition-transform duration-300">{item.emoji}</span>
              <span className="text-charcoal/60 text-sm font-semibold">{item.label}</span>
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/10 transition-colors duration-300 rounded-2xl" />
            </div>
          ))}
        </div>

        <div className="reveal text-center mt-10">
          <p className="text-cream/40 text-sm mb-4">Foto asli akan ditampilkan setelah konten disiapkan</p>
          <a
            href="https://wa.me/6281234567890?text=Halo%20Lumora%2C%20boleh%20lihat%20portofolio%20lengkap%20nggak%3F"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-cream/20 text-cream/70 hover:text-cream hover:border-cream/50 text-sm font-medium px-6 py-3 rounded-full transition-all"
          >
            Lihat Portofolio Lengkap via WhatsApp
          </a>
        </div>
      </div>
    </section>
  )
}
