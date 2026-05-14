import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'
import './index.css'

export function initGA() {
  const id = import.meta.env.VITE_GA_ID
  if (!id || window._gaLoaded) return
  window._gaLoaded = true
  const s = document.createElement('script')
  s.src = `https://www.googletagmanager.com/gtag/js?id=${id}`
  s.async = true; document.head.appendChild(s)
  window.dataLayer = window.dataLayer || []
  window.gtag = function() { window.dataLayer.push(arguments) }
  window.gtag('js', new Date()); window.gtag('config', id, { anonymize_ip: true })
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider><App /></ThemeProvider>
  </React.StrictMode>
)
