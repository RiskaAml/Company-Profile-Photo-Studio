import { useState, useEffect, useRef } from 'react'
import { ArrowRight, MapPin, Zap } from 'lucide-react'
import { Link } from 'react-router-dom'
import PhotoSlot from '../PhotoSlot'

const imgs = import.meta.glob('../../assets/*.{png,jpg,jpeg,webp,svg}', { eager: true, query: '?url', import: 'default' })
const img  = (n) => imgs[`../../assets/${n}`] ?? ''

const SLIDES = [
  { src: img('hero-1.png'), label: 'Portrait Session',   tag: 'Professional' },
  { src: img('hero-2.png'), label: 'Self Photo',          tag: 'Fun & Creative' },
  { src: img('hero-3.png'), label: 'Photoshoot Studio',   tag: 'Cinematic' },
  { src: img('hero-4.png'), label: 'Rental Gear',         tag: 'Pro Equipment' },
]

const STATS = [
  { val: '1K+',     label: 'Happy Clients',    color: 'text-mint-DEFAULT' },
  { val: '4 Spots', label: 'Studio Locations', color: 'text-purple-DEFAULT' },
  { val: '4.9★',   label: 'Google Rating',    color: 'text-yellow' },
  { val: '3 Services', label: 'Available Now', color: 'text-pink' },
]

export default function Hero() {
  const [idx, setIdx] = useState(0)
  const timer = useRef()

  useEffect(() => {
    timer.current = setInterval(() => setIdx(i => (i + 1) % SLIDES.length), 4000)
    return () => clearInterval(timer.current)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden bg-[#F0FDFB]">
      {/* Ambient glow blobs */}
      <div className="absolute top-1/4 -left-32 w-80 h-80 bg-mint-DEFAULT/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-80 h-80 bg-purple-DEFAULT/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container-x py-16 grid md:grid-cols-2 gap-12 items-center w-full">
        {/* Left */}
        <div>
          {/* Badge */}
          <div className="inline-flex items-center gap-2 border border-mint-DEFAULT/30 bg-mint-DEFAULT/5 text-mint-DEFAULT text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
            <Zap size={11} className="fill-mint-DEFAULT" />
            Studio Foto & Video · Sidoarjo
          </div>

          <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-[3.25rem] text-main leading-[1.1] mb-5">
            Bikin Konten
            <br />
            <span className="grad-text">Next Level</span>
            <br />
            <span className="italic font-normal text-sub text-3xl md:text-4xl">di sini.</span>
          </h1>

          <p className="text-sub text-base leading-relaxed mb-7 max-w-md">
            Studio foto & video modern untuk kreator, UMKM, dan semua yang mau tampil keren. Harga terjangkau, hasil profesional.
          </p>

          <div className="flex flex-wrap gap-3 mb-10">
            <a href="https://wa.me/6281234567890?text=Halo%20Dolananpoto%20Studio%2C%20mau%20booking!"
              target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 bg-mint-DEFAULT hover:bg-mint-dark text-[#0A0A0F] font-bold px-6 py-2.5 rounded-xl transition-colors text-sm glow-mint">
              Book Sekarang <ArrowRight size={15} />
            </a>
            <a href="#layanan"
              onClick={e => { e.preventDefault(); document.getElementById('layanan')?.scrollIntoView({ behavior: 'smooth' }) }}
              className="flex items-center gap-2 bg-[#0A0A0F] text-white font-semibold px-6 py-2.5 rounded-xl hover:bg-[#1A1A24] transition-colors text-sm border border-[#252532]">
              Explore Layanan
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {STATS.map(s => (
              <div key={s.label} className="bg-[#0A0A0F] border border-[#252532] rounded-xl px-3 py-2.5">
                <div className={`font-display font-bold text-base leading-none ${s.color}`}>{s.val}</div>
                <div className="text-zinc-400 text-xs mt-1">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Location pill */}
          <div className="flex items-center gap-1.5 mt-5 text-sub text-xs">
            <MapPin size={12} className="text-mint-DEFAULT" />
            <span>4 Lokasi — Sidoarjo & Surabaya</span>
          </div>
        </div>

        {/* Right — slideshow */}
        <div className="relative">
          <div className="relative rounded-2xl overflow-hidden h-80 md:h-[26rem] border border-[#C5F0EA]">
            {SLIDES.map((s, i) => (
              <div key={i} className={`absolute inset-0 transition-opacity duration-700 ${i === idx ? 'opacity-100' : 'opacity-0'}`}>
                <PhotoSlot src={s.src} alt={s.label} className="w-full h-full rounded-none" />
                {s.src && <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F]/60 to-transparent" />}
                {/* Label */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <span className="bg-[#0A0A0F]/70 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-lg border border-white/10">{s.label}</span>
                  <span className="bg-mint-DEFAULT/20 border border-mint-DEFAULT/40 text-mint-DEFAULT text-xs font-semibold px-3 py-1.5 rounded-lg">{s.tag}</span>
                </div>
              </div>
            ))}
            {/* Dots */}
            <div className="absolute top-4 right-4 flex gap-1.5">
              {SLIDES.map((_, i) => (
                <button key={i} onClick={() => setIdx(i)} aria-label={`Tampilkan slide ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all ${i === idx ? 'w-5 bg-mint-DEFAULT' : 'w-1.5 bg-white/30'}`} />
              ))}
            </div>
          </div>

          {/* Thumbnail strip */}
          <div className="grid grid-cols-4 gap-2 mt-2">
            {SLIDES.map((s, i) => (
              <button key={i} onClick={() => setIdx(i)} aria-label={`Tampilkan ${s.label}`}
                className={`h-14 rounded-xl overflow-hidden border transition-all ${i === idx ? 'border-mint-DEFAULT glow-mint scale-95' : 'border-[#C5F0EA] opacity-50 hover:opacity-80'}`}>
                <PhotoSlot src={s.src} alt={s.label} className="w-full h-full rounded-none" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
