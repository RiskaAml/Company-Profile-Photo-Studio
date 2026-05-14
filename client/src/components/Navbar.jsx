import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Sun, Moon } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

const NAV = [
  { label: 'Layanan',   href: '/#layanan' },
  { label: 'Ruangan',   href: '/#ruangan' },
  { label: 'Galeri',    href: '/galeri' },
  { label: 'Testimoni', href: '/#testimoni' },
  { label: 'Lokasi',    href: '/#lokasi' },
]

export default function Navbar() {
  const [open, setOpen]       = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location              = useLocation()
  const { dark, toggle }      = useTheme()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => setOpen(false), [location])

  const go = href => {
    if (!href.startsWith('/#')) return
    if (location.pathname !== '/') { window.location.href = href; return }
    document.getElementById(href.slice(2))?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300
      ${scrolled
        ? 'bg-white/80 dark:bg-d1/80 backdrop-blur-xl border-b border-zinc-200 dark:border-d3'
        : 'bg-transparent'}`}>
      <div className="container-x py-4 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-mint to-purple-DEFAULT flex items-center justify-center text-white font-bold text-sm font-display group-hover:scale-105 transition-transform glow-mint">
            AF
          </div>
          <div>
            <div className="font-display font-bold text-base text-main leading-none">AF Studio</div>
            <div className="text-[10px] text-sub leading-none mt-0.5 tracking-wider uppercase">Photo · Video</div>
          </div>
        </Link>

        {/* Desktop */}
        <nav className="hidden md:flex items-center gap-6">
          {NAV.map(n => (
            n.href.startsWith('/#')
              ? <button key={n.href} onClick={() => go(n.href)}
                  className="text-sm font-medium text-sub hover:text-main transition-colors relative group">
                  {n.label}
                  <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-mint group-hover:w-full transition-all duration-300" />
                </button>
              : <Link key={n.href} to={n.href}
                  className="text-sm font-medium text-sub hover:text-main transition-colors relative group">
                  {n.label}
                  <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-mint group-hover:w-full transition-all duration-300" />
                </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          {/* Theme toggle */}
          <button onClick={toggle}
            className="w-9 h-9 rounded-xl bg-zinc-100 dark:bg-d2 flex items-center justify-center text-sub hover:text-main hover:bg-zinc-200 dark:hover:bg-d3 transition-colors">
            {dark ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          <a href="https://wa.me/6281234567890?text=Halo%20AF%20Studio!"
            target="_blank" rel="noopener noreferrer"
            className="bg-mint text-d0 font-bold text-sm px-5 py-2 rounded-xl hover:bg-mint-dark transition-colors glow-mint">
            Book Sekarang
          </a>
        </div>

        <div className="md:hidden flex items-center gap-2">
          <button onClick={toggle} className="w-9 h-9 rounded-xl bg-zinc-100 dark:bg-d2 flex items-center justify-center text-sub">
            {dark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button onClick={() => setOpen(o => !o)} className="text-main">
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-white dark:bg-d1 border-t border-zinc-200 dark:border-d3 px-5 py-4 flex flex-col gap-3">
          {NAV.map(n => (
            n.href.startsWith('/#')
              ? <button key={n.href} onClick={() => { go(n.href); setOpen(false) }} className="text-sm font-medium text-main text-left py-1.5">{n.label}</button>
              : <Link key={n.href} to={n.href} className="text-sm font-medium text-main py-1.5">{n.label}</Link>
          ))}
          <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer"
            className="bg-mint text-d0 font-bold text-center py-2.5 rounded-xl mt-2">Book Sekarang</a>
        </div>
      )}
    </header>
  )
}
