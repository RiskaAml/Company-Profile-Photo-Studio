import { useEffect, useRef } from 'react'
import { Check } from 'lucide-react'

const plans = [
  {
    name: 'Self Photo',
    emoji: '🤳',
    price: '75.000',
    unit: '/ jam',
    color: 'border-gold/30 bg-gold/5',
    accent: 'text-gold',
    highlight: false,
    features: [
      'Studio dengan backdrop pilihan',
      'Lighting profesional',
      'Akses free props & aksesori',
      'Tidak termasuk editing',
      'Bisa tambah jam',
    ],
  },
  {
    name: 'Photoshoot Pro',
    emoji: '📷',
    price: '350.000',
    unit: '/ sesi',
    color: 'border-charcoal bg-charcoal',
    accent: 'text-gold',
    highlight: true,
    tag: 'Terlaris',
    features: [
      '2–3 jam sesi foto',
      '20 foto hasil editing terbaik',
      'Fotografer profesional',
      'Konsultasi konsep gratis',
      'File resolusi tinggi (digital)',
    ],
  },
  {
    name: 'Rental Kamera',
    emoji: '🎒',
    price: '150.000',
    unit: '/ hari',
    color: 'border-sage/30 bg-sage/5',
    accent: 'text-sage',
    highlight: false,
    features: [
      'Kamera mirrorless / DSLR',
      'Lensa kit termasuk',
      'Memory card termasuk',
      'Tersedia tas kamera',
      'Diskon sewa >3 hari',
    ],
  },
]

export default function Pricing() {
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
    <section id="pricing" ref={ref} className="py-24 px-6 bg-cream">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <div className="reveal inline-block bg-sky/20 text-sky font-semibold text-xs px-4 py-2 rounded-full mb-4"
            style={{ color: '#4a8fa8' }}>
            Harga Transparan
          </div>
          <h2 className="reveal font-display text-4xl md:text-5xl font-700 text-charcoal">
            Pilih paket <span className="text-sky" style={{ color: '#6aafc4' }}>yang pas</span> buatmu
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 items-start">
          {plans.map((plan, i) => (
            <div
              key={plan.name}
              className={`reveal border-2 ${plan.color} rounded-3xl p-7 flex flex-col gap-5 ${plan.highlight ? 'md:-mt-4 md:mb-4' : ''}`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {/* Header */}
              <div>
                {plan.tag && (
                  <div className="inline-block bg-gold/20 text-gold text-xs font-semibold px-3 py-1 rounded-full mb-3">
                    {plan.tag}
                  </div>
                )}
                <div className="text-3xl mb-3">{plan.emoji}</div>
                <div className={`font-display text-xl font-600 ${plan.highlight ? 'text-cream' : 'text-charcoal'}`}>
                  {plan.name}
                </div>
              </div>

              {/* Price */}
              <div className="flex items-end gap-1">
                <span className={`font-display text-3xl font-700 ${plan.highlight ? 'text-cream' : 'text-charcoal'}`}>
                  Rp {plan.price}
                </span>
                <span className={`text-sm pb-1 ${plan.highlight ? 'text-cream/50' : 'text-charcoal/40'}`}>
                  {plan.unit}
                </span>
              </div>

              {/* Features */}
              <ul className="space-y-3">
                {plan.features.map(f => (
                  <li key={f} className="flex items-start gap-3">
                    <Check size={15} className={`mt-0.5 flex-shrink-0 ${plan.highlight ? 'text-gold' : 'text-charcoal/40'}`} />
                    <span className={`text-sm ${plan.highlight ? 'text-cream/80' : 'text-charcoal/60'}`}>{f}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a
                href={`https://wa.me/6281234567890?text=Halo%20Lumora%2C%20saya%20mau%20info%20paket%20${encodeURIComponent(plan.name)}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-2 text-center font-semibold text-sm px-6 py-3 rounded-full transition-colors duration-300 ${
                  plan.highlight
                    ? 'bg-gold text-charcoal hover:bg-gold/80'
                    : 'bg-charcoal/10 text-charcoal hover:bg-charcoal hover:text-cream'
                }`}
              >
                Pilih Paket Ini
              </a>
            </div>
          ))}
        </div>

        <p className="reveal text-center text-charcoal/40 text-sm mt-8">
          Harga belum termasuk PPN. Hubungi kami untuk paket custom & diskon group.
        </p>
      </div>
    </section>
  )
}
