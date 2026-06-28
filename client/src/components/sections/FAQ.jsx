import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import useReveal from '../../hooks/useReveal'

const FAQS = [
  {
    q: 'Bagaimana cara booking di Dolananpoto Studio?',
    a: 'Kamu bisa booking langsung lewat website ini dengan klik "Booking Sekarang" di halaman layanan, atau hubungi kami via WhatsApp. Proses booking mudah dan hanya butuh beberapa menit.',
  },
  {
    q: 'Apakah perlu membayar DP (uang muka) saat booking?',
    a: 'Ya, kami meminta DP 50% dari total harga untuk mengamankan slot kamu. Sisa pembayaran bisa dilunasi saat hari H di studio.',
  },
  {
    q: 'Metode pembayaran apa saja yang tersedia?',
    a: 'Kami menerima Transfer Bank, QRIS, ShopeePay, GoPay, OVO, dan pembayaran tunai langsung di studio.',
  },
  {
    q: 'Apakah bisa cancel atau reschedule booking?',
    a: 'Reschedule bisa dilakukan paling lambat H-1 sebelum jadwal. Cancellation dikenakan potongan 30% dari DP. Silakan hubungi kami via WhatsApp untuk proses ini.',
  },
  {
    q: 'Berapa lama hasil foto selesai diedit?',
    a: 'Untuk paket Self Photo, hasil langsung bisa kamu download sendiri. Untuk paket Photoshoot dengan fotografer, hasil editing siap dalam 3–5 hari kerja setelah sesi selesai.',
  },
  {
    q: 'Di mana lokasi Dolananpoto Studio?',
    a: 'Kami punya 4 studio: Sidoarjo Kota (main studio), Waru, Gedangan, dan Surabaya Selatan. Semua lokasi bisa dilihat di bagian Lokasi di halaman utama.',
  },
  {
    q: 'Apakah harga sudah termasuk makeup artist (MUA)?',
    a: 'Harga tidak termasuk MUA. Namun kami punya rekomendasi MUA yang bisa kamu pakai dengan harga terjangkau. Hubungi kami untuk info lebih lanjut.',
  },
  {
    q: 'Boleh bawa properti sendiri saat sesi foto?',
    a: 'Tentu boleh! Kamu bebas bawa properti tambahan. Studio kami juga sudah menyediakan berbagai props yang bisa dipakai gratis.',
  },
  {
    q: 'Apakah ada diskon untuk grup atau booking berulang?',
    a: 'Ya! Ada diskon khusus untuk grup (6 orang ke atas) dan member yang sudah booking lebih dari 3 kali. Hubungi kami untuk informasi harga spesial.',
  },
  {
    q: 'Bagaimana dengan rental kamera? Apakah perlu deposit?',
    a: 'Rental kamera memerlukan deposit (KTP + uang deposit sesuai nilai alat). Deposit dikembalikan penuh jika alat dikembalikan dalam kondisi baik.',
  },
]

export default function FAQ() {
  const [open, setOpen] = useState(null)
  const ref = useReveal()

  return (
    <section id="faq" ref={ref} className="section-y bg-[#F0FDFB]">
      <div className="container-x">
        <div className="mb-12">
          <p className="reveal text-xs font-semibold text-mint-DEFAULT uppercase tracking-widest mb-3">— FAQ</p>
          <div className="reveal flex flex-col md:flex-row md:items-end justify-between gap-4">
            <h2 className="font-display font-bold text-2xl md:text-3xl text-main">Pertanyaan yang sering ditanyakan.</h2>
            <p className="text-sub text-sm max-w-xs">Masih ada pertanyaan? Hubungi kami langsung via WhatsApp.</p>
          </div>
        </div>

        <div className="max-w-3xl space-y-3">
          {FAQS.map((faq, i) => (
            <div key={i}
              className="reveal bg-white border border-[#C5F0EA] rounded-2xl overflow-hidden hover:border-[#A8E6DF] transition-colors"
              style={{ transitionDelay: `${i * 40}ms` }}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left">
                <span className="font-display font-semibold text-sm text-main">{faq.q}</span>
                <ChevronDown
                  size={16}
                  className={`flex-shrink-0 text-mint-DEFAULT transition-transform duration-300 ${open === i ? 'rotate-180' : ''}`}
                />
              </button>
              {open === i && (
                <div className="px-5 pb-4 border-t border-zinc-100 pt-3">
                  <p className="text-sub text-sm leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="reveal mt-10 text-center">
          <p className="text-sub text-sm mb-3">Masih punya pertanyaan lain?</p>
          <a href="https://wa.me/6281234567890?text=Halo%20Dolananpoto%20Studio%2C%20saya%20mau%20tanya!"
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-mint-DEFAULT text-d0 font-bold text-sm px-6 py-2.5 rounded-xl hover:bg-mint-dark transition-colors glow-mint">
            💬 Tanya via WhatsApp
          </a>
        </div>
      </div>
    </section>
  )
}
