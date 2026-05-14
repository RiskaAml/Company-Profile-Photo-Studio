import { useState, useEffect } from 'react'
import { initGA } from '../main'

export default function CookieBanner() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const c = localStorage.getItem('af-cookie')
    if (!c) setTimeout(() => setShow(true), 3000)
    else if (c === 'yes') initGA()
  }, [])

  const accept  = () => { localStorage.setItem('af-cookie','yes'); setShow(false); initGA() }
  const decline = () => { localStorage.setItem('af-cookie','no');  setShow(false) }

  if (!show) return null

  return (
    <div className="fixed bottom-5 right-5 left-5 sm:left-auto sm:w-80 z-50 animate-slide-up">
      <div className="bg-d1 dark:bg-d2 border border-d3 rounded-2xl p-5 shadow-2xl shadow-black/20">
        <div className="flex gap-3 mb-4">
          <div className="w-8 h-8 rounded-lg bg-mint/20 flex items-center justify-center text-sm flex-shrink-0">🍪</div>
          <div>
            <p className="font-display font-semibold text-sm text-white mb-1">Cookie Policy</p>
            <p className="text-xs text-zinc-400 leading-relaxed">Kami pakai cookie untuk analitik. Data kamu aman, tidak dijual.</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={accept}  className="flex-1 bg-mint text-d0 font-bold text-sm py-2 rounded-lg hover:bg-mint-dark transition-colors">Accept</button>
          <button onClick={decline} className="flex-1 bg-white/5 text-zinc-400 font-medium text-sm py-2 rounded-lg hover:bg-white/10 transition-colors">Decline</button>
        </div>
      </div>
    </div>
  )
}
