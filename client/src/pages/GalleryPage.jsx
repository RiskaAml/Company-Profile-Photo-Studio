import { useState } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import Footer from '../components/Footer'
import CTA from '../components/sections/CTA'

const imgs = import.meta.glob('../assets/gallery/*.{png,jpg,jpeg,webp,svg}',
  { eager: true, query: '?url', import: 'default' })
const img = (n) => imgs[`../assets/gallery/${n}`] ?? ''

const GALLERY = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  src: img(`gallery-${i + 1}.png`),
  title: `Foto ${i + 1}`,
}))

export default function GalleryPage() {
  const [lightbox, setLightbox] = useState(null)

  const prev = () => setLightbox(i => (i - 1 + GALLERY.length) % GALLERY.length)
  const next = () => setLightbox(i => (i + 1) % GALLERY.length)

  return (
    <>
      <div className="bg-[#F0FDFB] border-b border-[#C5F0EA] pt-16">
        <div className="container-x py-10">
          <h1 className="font-display font-bold text-2xl md:text-3xl text-main mb-2">Galeri Inspirasi Pose</h1>
          <p className="text-sub text-sm max-w-lg">Pilih yang cocok sama vibes kamu, tunjukkan ke tim kami!</p>
        </div>
      </div>

      <div className="container-x py-10">
        <div className="columns-2 sm:columns-3 lg:columns-4 gap-3 space-y-3">
          {GALLERY.map((p, i) => (
            <div key={p.id}
              className="break-inside-avoid rounded-md overflow-hidden cursor-pointer border-2 border-zinc-300 hover:border-[#00E5CC] transition-all hover:shadow-md"
              onClick={() => setLightbox(i)}>
              <img src={p.src} alt={p.title} className="w-full h-auto object-cover" />
            </div>
          ))}
        </div>
      </div>

      {lightbox !== null && (
        <div className="fixed inset-0 bg-d0/95 backdrop-blur-sm z-50 flex items-center justify-center" onClick={() => setLightbox(null)}>
          <button aria-label="Foto sebelumnya" onClick={e => { e.stopPropagation(); prev() }} className="absolute left-4 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white"><ChevronLeft size={20} /></button>
          <img src={GALLERY[lightbox].src} alt={GALLERY[lightbox].title} className="max-h-[85vh] max-w-[90vw] object-contain rounded-2xl" onClick={e => e.stopPropagation()} />
          <button aria-label="Foto berikutnya" onClick={e => { e.stopPropagation(); next() }} className="absolute right-4 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white"><ChevronRight size={20} /></button>
          <button aria-label="Tutup lightbox" onClick={() => setLightbox(null)} className="absolute top-4 right-4 w-9 h-9 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white"><X size={16} /></button>
          <div className="absolute bottom-4 text-white/40 text-xs">{lightbox + 1} / {GALLERY.length}</div>
        </div>
      )}
      <CTA />
      <Footer />
    </>
  )
}
