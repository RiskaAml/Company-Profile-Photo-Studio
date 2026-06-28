import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Menu, X, User, LogOut, ShoppingBag, LayoutDashboard } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

// Lazy-load logo from assets (shows fallback if logo.png not present)
const assetGlob = import.meta.glob('../assets/*.{png,jpg,jpeg,webp,svg}', { eager: true, query: '?url', import: 'default' })
const logoSrc = assetGlob['../assets/logo.png'] ?? ''

const NAV = [
  { label: 'Layanan',   href: '/#layanan' },
  { label: 'Ruangan',   href: '/#ruangan' },
  { label: 'Galeri',    href: '/galeri' },
  { label: 'Testimoni', href: '/#testimoni' },
  { label: 'Lokasi',    href: '/#lokasi' },
  { label: 'FAQ',       href: '/#faq' },
]

export default function Navbar() {
  const [open, setOpen]         = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [userMenu, setUserMenu] = useState(false)
  const location                = useLocation()
  const navigate                = useNavigate()
  const { user, logout }        = useAuth()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => { setOpen(false); setUserMenu(false) }, [location])

  const go = href => {
    if (!href.startsWith('/#')) return
    if (location.pathname !== '/') { window.location.href = href; return }
    document.getElementById(href.slice(2))?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleLogout = () => { logout(); setUserMenu(false); navigate('/') }

  const BookBtn = ({ className = '' }) => (
    <a href="https://wa.me/6281234567890?text=Halo%20Dolananpoto%20Studio!"
      target="_blank" rel="noopener noreferrer"
      className={`bg-[#00E5CC] text-[#0A0A0F] font-bold text-sm px-5 py-2 rounded-xl hover:bg-[#00B3A0] transition-colors glow-mint ${className}`}>
      Book Sekarang
    </a>
  )

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300
      ${scrolled
        ? 'bg-white/80 backdrop-blur-xl border-b border-[#C5F0EA]'
        : 'bg-transparent'}`}>
      <div className="container-x py-4 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <img src={logoSrc} alt="Dolananpoto Studio" className="w-9 h-9 object-contain rounded-full group-hover:scale-105 transition-transform" />
          <div>
            <div className="font-display font-bold text-base text-main leading-none">Dolananpoto Studio</div>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {NAV.map(n => (
            n.href.startsWith('/#')
              ? <button key={n.href} onClick={() => go(n.href)}
                  className="text-sm font-medium text-sub hover:text-main transition-colors relative group">
                  {n.label}
                  <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-mint-DEFAULT group-hover:w-full transition-all duration-300" />
                </button>
              : <Link key={n.href} to={n.href}
                  className="text-sm font-medium text-sub hover:text-main transition-colors relative group">
                  {n.label}
                  <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-mint-DEFAULT group-hover:w-full transition-all duration-300" />
                </Link>
          ))}
          {user && (
            <Link to="/riwayat"
              className="text-sm font-medium text-sub hover:text-main transition-colors relative group">
              Riwayat
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-mint-DEFAULT group-hover:w-full transition-all duration-300" />
            </Link>
          )}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <div className="relative">
              <button onClick={() => setUserMenu(m => !m)}
                className="flex items-center gap-2 border border-[#C5F0EA] rounded-xl px-3 py-2 text-sm font-medium text-main hover:border-[#A8E6DF] transition-colors">
                <User size={15} className="text-mint-DEFAULT" />
                <span className="max-w-[100px] truncate">{user.name}</span>
              </button>
              {userMenu && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-[#C5F0EA] rounded-xl shadow-xl overflow-hidden z-50">
                  {user.isAdmin && (
                    <Link to="/admin" className="flex items-center gap-2.5 px-4 py-3 text-sm text-main hover:bg-[#F0FDFB] transition-colors">
                      <LayoutDashboard size={14} className="text-purple-DEFAULT" /> Admin Dashboard
                    </Link>
                  )}
                  <Link to="/riwayat" className="flex items-center gap-2.5 px-4 py-3 text-sm text-main hover:bg-[#F0FDFB] transition-colors">
                    <ShoppingBag size={14} className="text-mint-DEFAULT" /> Riwayat Pembelian
                  </Link>
                  <button onClick={handleLogout} className="w-full flex items-center gap-2.5 px-4 py-3 text-sm text-red-500 hover:bg-red-50 transition-colors border-t border-zinc-100">
                    <LogOut size={14} /> Keluar
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/masuk"
              className="text-sm font-medium text-sub hover:text-main border border-[#C5F0EA] px-4 py-2 rounded-xl hover:border-[#A8E6DF] transition-colors">
              Masuk
            </Link>
          )}

          <BookBtn />
        </div>

        <div className="md:hidden flex items-center gap-2">
          <button onClick={() => setOpen(o => !o)} aria-label={open ? 'Tutup menu' : 'Buka menu'} className="text-main">
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-white border-t border-[#C5F0EA] px-5 py-4 flex flex-col gap-3">
          {NAV.map(n => (
            n.href.startsWith('/#')
              ? <button key={n.href} onClick={() => { go(n.href); setOpen(false) }} className="text-sm font-medium text-main text-left py-1.5">{n.label}</button>
              : <Link key={n.href} to={n.href} className="text-sm font-medium text-main py-1.5">{n.label}</Link>
          ))}
          {user && (
            <Link to="/riwayat" className="flex items-center gap-2 text-sm font-medium text-main py-1.5">
              <ShoppingBag size={14} className="text-mint-DEFAULT" /> Riwayat Pembelian
            </Link>
          )}
          {user?.isAdmin && (
            <Link to="/admin" className="flex items-center gap-2 text-sm font-medium text-main py-1.5">
              <LayoutDashboard size={14} className="text-purple-DEFAULT" /> Admin Dashboard
            </Link>
          )}
          {user ? (
            <button onClick={handleLogout}
              className="flex items-center gap-2 text-sm font-medium text-red-500 py-1.5">
              <LogOut size={14} /> Keluar
            </button>
          ) : (
            <Link to="/masuk" className="text-sm font-medium text-main py-1.5">Masuk / Daftar</Link>
          )}
          <BookBtn className="text-center py-2.5 mt-2" />
        </div>
      )}
    </header>
  )
}
