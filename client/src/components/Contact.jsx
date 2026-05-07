import { useEffect, useRef, useState } from 'react'
import { MessageCircle, Instagram, MapPin, Phone } from 'lucide-react'

export default function Contact() {
  const ref = useRef(null)
  const [form, setForm] = useState({ name: '', phone: '', service: '', message: '' })
  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.1 }
    )
    ref.current?.querySelectorAll('.reveal').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (res.ok) {
        setStatus('success')
        setForm({ name: '', phone: '', service: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" ref={ref} className="py-24 px-6 bg-cream">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <div>
            <div className="reveal inline-block bg-gold/15 text-gold font-semibold text-xs px-4 py-2 rounded-full mb-5">
              Hubungi Kami
            </div>
            <h2 className="reveal font-display text-4xl md:text-5xl font-700 text-charcoal leading-tight mb-6">
              Yuk, <span className="text-gold">ngobrol</span> <br />bareng kita!
            </h2>
            <p className="reveal text-charcoal/60 leading-relaxed mb-10">
              Punya pertanyaan, mau booking, atau butuh info lebih lanjut? Kita siap membantu kamu kapan saja.
            </p>

            <div className="reveal space-y-5">
              <a
                href="https://wa.me/6281234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 group"
              >
                <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center group-hover:bg-green-200 transition-colors">
                  <MessageCircle size={20} className="text-green-600" />
                </div>
                <div>
                  <div className="font-semibold text-charcoal text-sm group-hover:text-green-600 transition-colors">
                    WhatsApp
                  </div>
                  <div className="text-charcoal/50 text-sm">+62 812-3456-7890</div>
                </div>
              </a>

              <a
                href="https://instagram.com/lumorastudio"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 group"
              >
                <div className="w-12 h-12 bg-pink-100 rounded-2xl flex items-center justify-center group-hover:bg-pink-200 transition-colors">
                  <Instagram size={20} className="text-pink-600" />
                </div>
                <div>
                  <div className="font-semibold text-charcoal text-sm group-hover:text-pink-600 transition-colors">
                    Instagram
                  </div>
                  <div className="text-charcoal/50 text-sm">@lumorastudio</div>
                </div>
              </a>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <MapPin size={20} className="text-blue-500" />
                </div>
                <div>
                  <div className="font-semibold text-charcoal text-sm">Lokasi Studio</div>
                  <div className="text-charcoal/50 text-sm">Jl. Raya Sidoarjo No. 123, <br />Sidoarjo, Jawa Timur</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="reveal">
            <form onSubmit={handleSubmit} className="bg-white border border-charcoal/8 rounded-3xl p-8 flex flex-col gap-5">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 sm:col-span-1">
                  <label className="text-xs font-semibold text-charcoal/60 mb-1.5 block">Nama</label>
                  <input
                    type="text"
                    placeholder="Nama kamu"
                    required
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    className="w-full border border-charcoal/15 rounded-xl px-4 py-3 text-sm text-charcoal placeholder:text-charcoal/30 focus:outline-none focus:border-gold transition-colors"
                  />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label className="text-xs font-semibold text-charcoal/60 mb-1.5 block">No. WhatsApp</label>
                  <input
                    type="tel"
                    placeholder="08xxxxxxxxxx"
                    required
                    value={form.phone}
                    onChange={e => setForm({ ...form, phone: e.target.value })}
                    className="w-full border border-charcoal/15 rounded-xl px-4 py-3 text-sm text-charcoal placeholder:text-charcoal/30 focus:outline-none focus:border-gold transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-charcoal/60 mb-1.5 block">Layanan yang diminati</label>
                <select
                  value={form.service}
                  onChange={e => setForm({ ...form, service: e.target.value })}
                  className="w-full border border-charcoal/15 rounded-xl px-4 py-3 text-sm text-charcoal focus:outline-none focus:border-gold transition-colors bg-white"
                >
                  <option value="">Pilih layanan...</option>
                  <option>Self Photo</option>
                  <option>Photoshoot Profesional</option>
                  <option>Rental Kamera</option>
                  <option>Lainnya</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-charcoal/60 mb-1.5 block">Pesan</label>
                <textarea
                  rows={4}
                  placeholder="Ceritakan kebutuhanmu..."
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  className="w-full border border-charcoal/15 rounded-xl px-4 py-3 text-sm text-charcoal placeholder:text-charcoal/30 focus:outline-none focus:border-gold transition-colors resize-none"
                />
              </div>

              {status === 'success' && (
                <div className="bg-green-50 text-green-700 text-sm font-medium px-4 py-3 rounded-xl">
                  ✅ Pesan terkirim! Kami akan segera menghubungimu.
                </div>
              )}
              {status === 'error' && (
                <div className="bg-red-50 text-red-600 text-sm font-medium px-4 py-3 rounded-xl">
                  ❌ Gagal mengirim. Silakan coba via WhatsApp langsung.
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="bg-charcoal text-cream font-semibold py-3.5 rounded-xl hover:bg-gold transition-colors duration-300 disabled:opacity-50"
              >
                {loading ? 'Mengirim...' : 'Kirim Pesan'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
