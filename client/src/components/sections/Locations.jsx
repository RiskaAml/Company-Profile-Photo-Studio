import { useState } from 'react'
import { MapPin, Clock } from 'lucide-react'
import useReveal from '../../hooks/useReveal'

const LOCATIONS = [
  {
    name: 'Lamongan Kota',
    address: 'Ruko, Jl. Veteran No.33A, Mendalan, Banjarmendalan, Kec. Lamongan, Kabupaten Lamongan, Jawa Timur 62212',
    hours: '08.20 – 20.00',
    mapsUrl: 'https://maps.app.goo.gl/RQAriUJ4XNEDUSKd7',
    embedQuery: 'Jl+Veteran+No+33A+Mendalan+Banjarmendalan+Kec+Lamongan+Jawa+Timur',
    badge: 'Buka Malam',
    badgeColor: 'text-mint-DEFAULT bg-mint-DEFAULT/10 border-mint-DEFAULT/20',
    dot: 'bg-mint-DEFAULT',
  },
  {
    name: 'Bojonegoro',
    address: 'RT.21/RW.05, Ngumpak, Ngumpak Dalem, Dander, Bojonegoro Regency, East Java 62171',
    hours: '08.20 – 16.30',
    mapsUrl: 'https://maps.app.goo.gl/w1po2BD1HQoxxhDQA',
    embedQuery: 'Ngumpak+Dalem+Dander+Bojonegoro+Jawa+Timur',
    badge: null,
    dot: 'bg-purple-DEFAULT',
  },
  {
    name: 'Dukun, Gresik',
    address: 'Jl. Raya Dukun, Sembungan Kidul, Kec. Dukun, Kabupaten Gresik, Jawa Timur 61155',
    hours: '08.20 – 16.30',
    mapsUrl: 'https://maps.app.goo.gl/skEWKSbi2rnya7DRA',
    embedQuery: 'Jl+Raya+Dukun+Sembungan+Kidul+Kec+Dukun+Kabupaten+Gresik',
    badge: null,
    dot: 'bg-pink',
  },
  {
    name: 'Benjeng, Gresik',
    address: 'Jalan raya, RT.16/RW.3, Karangpundut, Punduttrate, Kec. Benjeng, Kabupaten Gresik, Jawa Timur 61172',
    hours: '08.20 – 16.30 (konfirmasi WA dulu)',
    mapsUrl: 'https://maps.app.goo.gl/fUmuppC5quB36MvG7',
    embedQuery: 'Karangpundut+Punduttrate+Kec+Benjeng+Kabupaten+Gresik',
    badge: null,
    dot: 'bg-yellow',
  },
]

export default function Locations() {
  const ref = useReveal()
  const [mapIdx, setMapIdx] = useState(0)
  const activeLoc = LOCATIONS[mapIdx]

  return (
    <section id="lokasi" ref={ref} className="section-y bg-[#F0FDFB]">
      <div className="container-x">
        <div className="mb-8 md:mb-12">
          <p className="text-xs font-semibold text-[#00E5CC] uppercase tracking-widest mb-3">— LOKASI</p>
          <h2 className="font-display font-bold text-2xl md:text-3xl text-main mb-2">Studio kami ada di dekatmu.</h2>
          <p className="text-sub text-sm max-w-lg">4 lokasi di Gresik, Lamongan, dan Bojonegoro.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {LOCATIONS.map((l, i) => (
            <div key={l.name}
              onClick={() => setMapIdx(i)}
              className={`reveal bg-white border-2 rounded-2xl p-4 transition-colors cursor-pointer ${mapIdx === i ? 'border-mint-DEFAULT shadow-sm' : 'border-zinc-300 hover:border-zinc-400'}`}
              style={{ transitionDelay: `${i * 60}ms` }}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${l.dot}`} />
                  <span className="font-display font-bold text-sm text-main">{l.name}</span>
                </div>
                {l.badge && <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${l.badgeColor}`}>{l.badge}</span>}
              </div>
              <div className="space-y-1.5 text-xs text-sub">
                <div className="flex items-start gap-1.5"><MapPin size={11} className="mt-0.5 flex-shrink-0 text-mint-DEFAULT" /><span>{l.address}</span></div>
                <div className="flex items-center gap-1.5"><Clock size={11} className="flex-shrink-0 text-mint-DEFAULT" /><span>{l.hours}</span></div>
              </div>
              <a href={l.mapsUrl} target="_blank" rel="noopener noreferrer"
                onClick={e => e.stopPropagation()}
                className="mt-3 block text-xs font-semibold text-mint-DEFAULT hover:underline">Open in Maps →</a>
            </div>
          ))}
        </div>

        <div className="reveal rounded-2xl overflow-hidden border border-zinc-300">
          <div className="bg-white px-4 py-2.5 border-b border-zinc-200 flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${activeLoc.dot}`} />
            <span className="text-sm font-semibold text-main">Dolananpoto Studio — {activeLoc.name}</span>
          </div>
          <iframe
            key={mapIdx}
            src={`https://maps.google.com/maps?q=${activeLoc.embedQuery}&output=embed`}
            width="100%" height="280" style={{ border: 0 }} allowFullScreen loading="lazy"
            referrerPolicy="no-referrer-when-downgrade" title={`Lokasi ${activeLoc.name}`} />
        </div>
      </div>
    </section>
  )
}
