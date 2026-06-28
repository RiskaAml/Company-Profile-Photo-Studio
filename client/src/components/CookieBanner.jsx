import { useState, useEffect } from 'react'
import { initGA } from '../main'

export default function CookieBanner() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const c = localStorage.getItem('dp-cookie')
    if (!c) setTimeout(() => setShow(true), 3000)
    else if (c === 'yes') initGA()
  }, [])

  const accept = () => { localStorage.setItem('dp-cookie', 'yes'); setShow(false); initGA() }

  if (!show) return null

  return (
    <div className="fixed bottom-5 right-5 left-5 sm:left-auto sm:w-80 z-50 animate-slide-up">
      <div className="bg-d1 border border-d3 rounded-2xl px-5 py-4 shadow-2xl shadow-black/20 flex items-center justify-between gap-4">
        <p className="text-xs text-zinc-400 leading-relaxed">
          Kami menggunakan cookie untuk analitik. Data kamu aman dan tidak dijual.
        </p>
        <button onClick={accept}
          className="flex-shrink-0 bg-mint-DEFAULT text-d0 font-bold text-xs px-4 py-2 rounded-lg hover:bg-mint-dark transition-colors whitespace-nowrap">
          OK, Setuju
        </button>
      </div>
    </div>
  )
}
