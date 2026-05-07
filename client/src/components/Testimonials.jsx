import { useEffect, useRef } from 'react'

const reviews = [
  {
    name: 'Ayu Maharani',
    role: 'Content Creator',
    avatar: '🧕',
    text: 'Studionya bersih, rapi, dan lighting-nya bagus banget! Saya self photo sendiri dan hasilnya keren. Worth it banget harganya.',
    rating: 5,
  },
  {
    name: 'Budi Santoso',
    role: 'Calon Pengantin',
    avatar: '🤵',
    text: 'Foto prewedding casual kami di sini, fotografernya sabar dan hasilnya melampaui ekspektasi. Highly recommended!',
    rating: 5,
  },
  {
    name: 'Citra Dewi',
    role: 'Mahasiswi',
    avatar: '👩‍🎓',
    text: 'Foto wisuda di Lumora, hasilnya natural dan cantik. Tim-nya friendly, buat saya yang awkward depan kamera jadi nyaman.',
    rating: 5,
  },
  {
    name: 'Dika Pratama',
    role: 'UKM Owner',
    avatar: '🧑‍💼',
    text: 'Foto produk UMKM saya jadi jauh lebih profesional. Penjualan online naik setelah ganti foto pakai Lumora. Mantap!',
    rating: 5,
  },
]

export default function Testimonials() {
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
    <section id="testimonials" ref={ref} className="py-24 px-6 bg-charcoal/5">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <div className="reveal inline-block bg-blush/20 text-blush font-semibold text-xs px-4 py-2 rounded-full mb-4">
            Testimoni
          </div>
          <h2 className="reveal font-display text-4xl md:text-5xl font-700 text-charcoal">
            Kata mereka tentang <span className="text-blush">Lumora</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {reviews.map((r, i) => (
            <div
              key={r.name}
              className="reveal bg-white border border-charcoal/8 rounded-3xl p-7 flex flex-col gap-4"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              {/* Stars */}
              <div className="flex gap-1">
                {Array.from({ length: r.rating }).map((_, j) => (
                  <span key={j} className="text-gold text-sm">★</span>
                ))}
              </div>
              {/* Quote */}
              <p className="text-charcoal/70 text-sm leading-relaxed italic">"{r.text}"</p>
              {/* Author */}
              <div className="flex items-center gap-3 pt-2 border-t border-charcoal/8">
                <div className="w-10 h-10 bg-cream rounded-full flex items-center justify-center text-xl">
                  {r.avatar}
                </div>
                <div>
                  <div className="font-semibold text-charcoal text-sm">{r.name}</div>
                  <div className="text-charcoal/40 text-xs">{r.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
