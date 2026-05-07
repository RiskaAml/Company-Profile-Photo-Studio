import { useState, useEffect } from 'react'
import { Menu, X, Camera } from 'lucide-react'

const links = [
  { label: 'Layanan', href: '#services' },
  { label: 'Portofolio', href: '#portfolio' },
  { label: 'Tentang Kami', href: '#about' },
  { label: 'Harga', href: '#pricing' },
  { label: 'Kontak', href: '#contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-cream/95 backdrop-blur-sm shadow-sm' : 'bg-transparent'}`}>
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-gold rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
            <Camera size={16} className="text-white" />
          </div>
          <span className="font-display font-700 text-xl text-charcoal tracking-tight">
            Lumora<span className="text-gold">.</span>
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-charcoal/70 hover:text-charcoal transition-colors relative group"
            >
              {l.label}
              <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-gold group-hover:w-full transition-all duration-300" />
            </a>
          ))}
          <a
            href="https://wa.me/6281234567890?text=Halo%20Lumora%20Studio%2C%20saya%20ingin%20booking%20sesi%20foto"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-charcoal text-cream text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-gold transition-colors duration-300"
          >
            Book Sekarang
          </a>
        </nav>

        {/* Mobile toggle */}
        <button className="md:hidden text-charcoal" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-cream/98 backdrop-blur-sm border-t border-charcoal/10 px-6 py-6 flex flex-col gap-4">
          {links.map(l => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-base font-medium text-charcoal py-1"
            >
              {l.label}
            </a>
          ))}
          <a
            href="https://wa.me/6281234567890"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-charcoal text-cream text-center font-semibold px-5 py-3 rounded-full mt-2"
          >
            Book Sekarang
          </a>
        </div>
      )}
    </header>
  )
}
