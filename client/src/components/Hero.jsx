import { useEffect, useRef } from 'react'
import { ArrowDown, Sparkles } from 'lucide-react'

export default function Hero() {
  const ref = useRef(null)

  useEffect(() => {
    const els = ref.current?.querySelectorAll('[data-delay]')
    els?.forEach((el) => {
      const delay = el.getAttribute('data-delay')
      setTimeout(() => el.classList.add('visible'), Number(delay))
    })
  }, [])

  return (
    <section ref={ref} className="relative min-h-screen flex items-center overflow-hidden bg-cream pt-20">
      {/* Background decorative blobs */}
      <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-gold/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blush/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[200px] h-[200px] bg-sage/10 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center w-full">
        {/* Left: Text */}
        <div>
          {/* Badge */}
          <div data-delay="100" className="reveal inline-flex items-center gap-2 bg-gold/15 text-gold font-semibold text-xs px-4 py-2 rounded-full mb-6">
            <Sparkles size={12} />
            Studio Foto Profesional di Sidoarjo
          </div>

          <h1 data-delay="200" className="reveal font-display text-5xl md:text-6xl lg:text-7xl font-700 text-charcoal leading-[1.05] mb-6">
            Momen
            <br />
            <span className="text-gold">Terbaik</span>
            <br />
            <span className="italic font-400">Kamu</span>
          </h1>

          <p data-delay="350" className="reveal text-charcoal/60 text-lg leading-relaxed mb-8 max-w-md">
            Photo studio modern yang cozy dan menyenangkan. Tersedia selfphoto, photoshoot profesional, dan rental kamera untuk segala kebutuhan visualmu.
          </p>

          <div data-delay="500" className="reveal flex flex-col sm:flex-row gap-3">
            <a
              href="https://wa.me/6281234567890?text=Halo%20Lumora%2C%20saya%20mau%20booking%20sesi%20foto"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-charcoal text-cream font-semibold px-7 py-3.5 rounded-full hover:bg-gold transition-colors duration-300 text-center"
            >
              Book Sesi Foto
            </a>
            <a
              href="#portfolio"
              className="border-2 border-charcoal/20 text-charcoal font-semibold px-7 py-3.5 rounded-full hover:border-charcoal transition-colors duration-300 text-center"
            >
              Lihat Portofolio
            </a>
          </div>

          {/* Stats */}
          <div data-delay="650" className="reveal flex gap-8 mt-12">
            {[['500+', 'Klien Puas'], ['3', 'Layanan'], ['4.9★', 'Rating']].map(([val, label]) => (
              <div key={label}>
                <div className="font-display text-2xl font-700 text-charcoal">{val}</div>
                <div className="text-xs text-charcoal/50 mt-0.5">{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Visual collage */}
        <div data-delay="300" className="reveal relative hidden md:block">
          {/* Main photo card */}
          <div className="relative w-full aspect-[4/5] max-w-sm mx-auto">
            {/* Card 1 - main */}
            <div className="absolute inset-0 bg-gradient-to-br from-sage/30 to-blush/30 rounded-3xl overflow-hidden border border-white/60 shadow-xl">
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 bg-gold/20 rounded-full mx-auto mb-4 flex items-center justify-center animate-float">
                    <span className="text-5xl">📸</span>
                  </div>
                  <p className="font-display text-lg text-charcoal/70">Your photo here</p>
                </div>
              </div>
            </div>

            {/* Floating card: next sesi */}
            <div className="absolute -bottom-6 -left-8 bg-white rounded-2xl shadow-lg p-4 w-44">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-gold/20 rounded-xl flex items-center justify-center text-lg">📅</div>
                <div>
                  <div className="text-xs font-semibold text-charcoal">Sesi Hari Ini</div>
                  <div className="text-xs text-charcoal/50">3 slot tersisa</div>
                </div>
              </div>
            </div>

            {/* Floating card: rating */}
            <div className="absolute -top-4 -right-6 bg-gold text-white rounded-2xl shadow-lg p-3 text-center">
              <div className="font-display text-2xl font-700">4.9</div>
              <div className="text-xs opacity-80">Rating</div>
            </div>

            {/* Decorative dots */}
            <div className="absolute -bottom-10 right-4 grid grid-cols-4 gap-1.5 opacity-30">
              {Array.from({length: 16}).map((_, i) => (
                <div key={i} className="w-1.5 h-1.5 bg-charcoal rounded-full" />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <a href="#services" className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-charcoal/40 hover:text-charcoal/70 transition-colors">
        <span className="text-xs font-medium">Scroll</span>
        <ArrowDown size={16} className="animate-bounce" />
      </a>
    </section>
  )
}
