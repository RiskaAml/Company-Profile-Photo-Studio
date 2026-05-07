import { useEffect, useRef } from 'react'
import { MapPin, Clock, Heart } from 'lucide-react'

const perks = [
  { icon: MapPin, label: 'Lokasi Strategis', desc: 'Mudah dijangkau di pusat Sidoarjo' },
  { icon: Clock, label: 'Buka 7 Hari', desc: 'Senin–Minggu, 09.00–21.00 WIB' },
  { icon: Heart, label: 'Tim yang Ramah', desc: 'Kami memastikan kamu nyaman & percaya diri' },
]

export default function About() {
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
    <section id="about" ref={ref} className="py-24 px-6 bg-cream">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        {/* Visual */}
        <div className="reveal relative">
          <div className="relative w-full aspect-square max-w-md">
            {/* Main card */}
            <div className="absolute inset-8 bg-gradient-to-br from-blush/30 via-gold/10 to-sage/20 rounded-3xl flex items-center justify-center text-8xl shadow-inner">
              🏠
            </div>
            {/* Outer ring */}
            <div className="absolute inset-0 border-2 border-dashed border-charcoal/10 rounded-3xl" />

            {/* Float badge */}
            <div className="absolute top-0 right-0 bg-charcoal text-cream rounded-2xl px-4 py-3 shadow-lg">
              <div className="font-display text-xl font-700">2020</div>
              <div className="text-xs opacity-60">Berdiri sejak</div>
            </div>
            <div className="absolute bottom-0 left-0 bg-white rounded-2xl px-4 py-3 shadow-lg">
              <div className="font-display text-xl font-700 text-gold">500+</div>
              <div className="text-xs text-charcoal/50">Happy clients</div>
            </div>
          </div>
        </div>

        {/* Text */}
        <div>
          <div className="reveal inline-block bg-blush/20 text-blush font-semibold text-xs px-4 py-2 rounded-full mb-5">
            Tentang Kami
          </div>
          <h2 className="reveal font-display text-4xl md:text-5xl font-700 text-charcoal leading-tight mb-6">
            Studio yang terasa <br />
            <span className="text-blush italic font-400">seperti rumah</span>
          </h2>
          <p className="reveal text-charcoal/60 leading-relaxed mb-4">
            Lumora Studio lahir dari kecintaan terhadap fotografi dan keyakinan bahwa setiap orang berhak mendapatkan foto yang indah. Kami bukan sekadar studio — kami adalah tempat di mana kamu bisa jadi dirimu sendiri.
          </p>
          <p className="reveal text-charcoal/60 leading-relaxed mb-10">
            Dengan tim fotografer berpengalaman dan studio yang nyaman, kami hadir untuk memastikan setiap sesi fotomu menjadi pengalaman yang menyenangkan dan hasilnya melampaui ekspektasimu.
          </p>

          <div className="reveal space-y-4">
            {perks.map(({ icon: Icon, label, desc }) => (
              <div key={label} className="flex items-start gap-4">
                <div className="w-10 h-10 bg-charcoal/5 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Icon size={18} className="text-charcoal/60" />
                </div>
                <div>
                  <div className="font-semibold text-charcoal text-sm">{label}</div>
                  <div className="text-charcoal/50 text-sm">{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
