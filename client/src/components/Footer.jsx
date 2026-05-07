import { Camera } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-charcoal text-cream py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-gold rounded-full flex items-center justify-center">
                <Camera size={16} className="text-white" />
              </div>
              <span className="font-display text-xl font-700">
                Lumora<span className="text-gold">.</span>
              </span>
            </div>
            <p className="text-cream/40 text-sm max-w-xs leading-relaxed">
              Studio foto modern yang cozy, untuk momen terbaik dalam hidupmu.
            </p>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 gap-x-16 gap-y-2">
            {[
              ['Layanan', '#services'],
              ['Portofolio', '#portfolio'],
              ['Tentang Kami', '#about'],
              ['Harga', '#pricing'],
              ['Kontak', '#contact'],
            ].map(([label, href]) => (
              <a
                key={href}
                href={href}
                className="text-sm text-cream/50 hover:text-cream transition-colors"
              >
                {label}
              </a>
            ))}
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-cream/30 text-xs">
            © {new Date().getFullYear()} Lumora Studio. All rights reserved.
          </p>
          <p className="text-cream/20 text-xs">
            Sidoarjo, Jawa Timur 🇮🇩
          </p>
        </div>
      </div>
    </footer>
  )
}
