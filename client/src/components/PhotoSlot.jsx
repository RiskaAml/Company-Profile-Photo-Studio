// Cara pakai: <PhotoSlot src="/photos/hero.jpg" alt="Hero" className="h-64 rounded-xl" />
// Kalau src kosong/undefined, tampil placeholder abu-abu
export default function PhotoSlot({ src, alt = 'Foto', className = '' }) {
  if (src) return <img src={src} alt={alt} className={`object-cover w-full h-full ${className}`} loading="lazy" />
  return (
    <div className={`photo-slot ${className}`}>
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="3" width="18" height="18" rx="3" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <path d="m21 15-5-5L5 21" />
      </svg>
      <span>{alt}</span>
    </div>
  )
}
