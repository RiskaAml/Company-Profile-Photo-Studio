import { Camera, Instagram, Youtube, MessageCircle, Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-d0 dark:bg-black border-t border-d3 text-white">
      <div className="container-x py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-gradient-to-br from-mint-DEFAULT to-purple-DEFAULT rounded-lg flex items-center justify-center">
                <Camera size={14} className="text-d0" />
              </div>
              <span className="font-display font-bold text-base">AF Studio</span>
            </div>
            <p className="text-zinc-500 text-sm leading-relaxed mb-4">Studio foto & video modern. Untuk kreator, UMKM, dan semua yang mau tampil keren.</p>
            <div className="flex gap-2">
              {[
                { icon: Instagram, href: 'https://instagram.com/afstudio', hov: 'hover:bg-pink/30 hover:text-pink' },
                { icon: Youtube,   href: 'https://youtube.com/@afstudio',  hov: 'hover:bg-red-500/30 hover:text-red-400' },
                { icon: MessageCircle, href: 'https://wa.me/6281234567890', hov: 'hover:bg-emerald-500/30 hover:text-emerald-400' },
                { icon: Mail,      href: 'mailto:hello@afstudio.id',        hov: 'hover:bg-mint-DEFAULT/30 hover:text-mint-DEFAULT' },
              ].map(({ icon: Icon, href, hov }, i) => (
                <a key={i} href={href} target="_blank" rel="noopener noreferrer"
                  className={`w-8 h-8 bg-white/5 ${hov} rounded-lg flex items-center justify-center text-zinc-500 transition-all`}>
                  <Icon size={14} />
                </a>
              ))}
              <a href="https://tiktok.com/@afstudio" target="_blank" rel="noopener noreferrer"
                className="w-8 h-8 bg-white/5 hover:bg-white/15 rounded-lg flex items-center justify-center text-zinc-500 hover:text-white transition-all text-[10px] font-bold">TK</a>
            </div>
          </div>

          {[
            { title: 'Services', links: ['Photoshoot & Video', 'Self Photo', 'Rental Kamera & iPhone'] },
            { title: 'Studio',   links: ['Galeri & Inspirasi', 'Lokasi Studio', 'Testimoni', 'Book Sekarang'] },
            { title: 'Contact',  links: ['📱 0812-3456-7890', '✉️ hello@afstudio.id', '📍 Sidoarjo & Surabaya', '🕐 Buka 7 hari, 09–21'] },
          ].map(col => (
            <div key={col.title}>
              <div className="text-xs font-semibold text-zinc-600 uppercase tracking-wider mb-3">{col.title}</div>
              <div className="space-y-2">
                {col.links.map(l => <div key={l} className="text-sm text-zinc-500 hover:text-white transition-colors cursor-pointer">{l}</div>)}
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-d3 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-zinc-600">
          <span>© {new Date().getFullYear()} AF Studio. All rights reserved.</span>
          <span>Made with ✨ in Sidoarjo, Indonesia</span>
        </div>
      </div>
    </footer>
  )
}
