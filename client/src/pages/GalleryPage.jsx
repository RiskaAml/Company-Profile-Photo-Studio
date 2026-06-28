import { useState } from 'react'
import { X, ChevronLeft, ChevronRight, MessageCircle } from 'lucide-react'
import PhotoSlot from '../components/PhotoSlot'
import Footer from '../components/Footer'

const CATS = [
  { key:'all', label:'All' },
  { key:'portrait', label:'Portrait' },
  { key:'selfphoto', label:'Self Photo' },
  { key:'couple', label:'Couple' },
  { key:'family', label:'Family' },
  { key:'product', label:'Product' },
]

// ── ISI FOTO GALERI ───────────────────────────────────────────
const ITEMS = [
  { id:1,  title:'Casual Portrait',    cat:'portrait',  src:'', color:'text-rose-400' },
  { id:2,  title:'Squad Goals',        cat:'selfphoto', src:'', color:'text-sky-400' },
  { id:3,  title:'Couple Goals',       cat:'couple',    src:'', color:'text-purple-400' },
  { id:4,  title:'Product Flatlay',    cat:'product',   src:'', color:'text-amber-400' },
  { id:5,  title:'Graduation',         cat:'portrait',  src:'', color:'text-emerald-400' },
  { id:6,  title:'Family Session',     cat:'family',    src:'', color:'text-fuchsia-400' },
  { id:7,  title:'Mirror Selfie',      cat:'selfphoto', src:'', color:'text-sky-400' },
  { id:8,  title:'Editorial Moody',    cat:'portrait',  src:'', color:'text-rose-400' },
  { id:9,  title:'BFF Session',        cat:'selfphoto', src:'', color:'text-fuchsia-400' },
  { id:10, title:'Product Showcase',   cat:'product',   src:'', color:'text-amber-400' },
  { id:11, title:'Anniversary',        cat:'couple',    src:'', color:'text-purple-400' },
  { id:12, title:'Family Portrait',    cat:'family',    src:'', color:'text-emerald-400' },
]

export default function GalleryPage() {
  const [cat, setCat]         = useState('all')
  const [lightbox, setLightbox] = useState(null)

  const filtered = cat === 'all' ? ITEMS : ITEMS.filter(i => i.cat === cat)

  const prev = () => setLightbox(i => (i - 1 + filtered.length) % filtered.length)
  const next = () => setLightbox(i => (i + 1) % filtered.length)

  return (
    <>
      <div className="bg-[#F0FDFB] border-b border-[#C5F0EA] pt-16">
        <div className="container-x py-10">
          <p className="text-xs font-semibold text-mint-DEFAULT uppercase tracking-widest mb-3">— Pose Inspiration</p>
          <h1 className="font-display font-bold text-2xl md:text-3xl text-main mb-2">Galeri Inspirasi Pose</h1>
          <p className="text-sub text-sm max-w-lg">Pilih yang cocok sama vibes kamu, tunjukkan ke tim kami!</p>
        </div>
      </div>

      {/* Filter */}
      <div className="bg-white border-b border-[#C5F0EA] sticky top-14 z-30">
        <div className="container-x">
          <div className="flex gap-2 overflow-x-auto py-3">
            {CATS.map(c => (
              <button key={c.key} onClick={() => setCat(c.key)}
                className={`flex-shrink-0 text-sm font-semibold px-4 py-1.5 rounded-lg transition-all ${cat === c.key ? 'bg-mint-DEFAULT text-d0' : 'bg-[#E6FAF7] text-sub hover:text-main border border-[#C5F0EA]'}`}>
                {c.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container-x py-10">
        <p className="text-sub text-sm mb-5">{filtered.length} inspirasi</p>
        <div className="columns-2 sm:columns-3 lg:columns-4 gap-3 space-y-3">
          {filtered.map((item, i) => (
            <div key={item.id}
              className="break-inside-avoid group relative rounded-2xl overflow-hidden cursor-pointer border border-[#C5F0EA] hover:border-mint-DEFAULT/50 transition-all hover:shadow-md"
              onClick={() => setLightbox(i)}>
              <div className="aspect-[3/4]">
                <PhotoSlot src={item.src} alt={item.title} className="w-full h-full rounded-none" />
              </div>
              {item.src && <div className="absolute inset-0 bg-d0/0 group-hover:bg-d0/25 transition-colors" />}
              <div className="absolute bottom-2.5 left-2.5">
                <span className={`text-xs font-bold px-2.5 py-1 rounded-lg bg-white/85 backdrop-blur-sm ${item.color}`}>{item.title}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 bg-gradient-to-r from-mint-DEFAULT/10 to-purple-DEFAULT/10 border border-mint-DEFAULT/20 rounded-2xl p-8 text-center">
          <h3 className="font-display font-bold text-lg text-main mb-2">Ada konsep foto sendiri?</h3>
          <p className="text-sub text-sm mb-5">Ceritakan ke kami — konsultasi gratis!</p>
          <a href="https://wa.me/6281234567890?text=Halo%20AF%20Studio%2C%20saya%20mau%20konsultasi%20konsep%20foto!"
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-mint-DEFAULT text-d0 font-bold px-6 py-2.5 rounded-xl hover:bg-mint-dark transition-colors text-sm glow-mint">
            <MessageCircle size={15} /> Chat Sekarang
          </a>
        </div>
      </div>

      {lightbox !== null && filtered[lightbox]?.src && (
        <div className="fixed inset-0 bg-d0/95 backdrop-blur-sm z-50 flex items-center justify-center" onClick={() => setLightbox(null)}>
          <button aria-label="Foto sebelumnya" onClick={e => { e.stopPropagation(); prev() }} className="absolute left-4 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white"><ChevronLeft size={20} /></button>
          <img src={filtered[lightbox].src} alt={filtered[lightbox].title} className="max-h-[85vh] max-w-[90vw] object-contain rounded-2xl" onClick={e => e.stopPropagation()} />
          <button aria-label="Foto berikutnya" onClick={e => { e.stopPropagation(); next() }} className="absolute right-4 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white"><ChevronRight size={20} /></button>
          <button aria-label="Tutup lightbox" onClick={() => setLightbox(null)} className="absolute top-4 right-4 w-9 h-9 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white"><X size={16} /></button>
          <div className="absolute bottom-4 text-white/40 text-xs">{lightbox + 1} / {filtered.length}</div>
        </div>
      )}
      <Footer />
    </>
  )
}
