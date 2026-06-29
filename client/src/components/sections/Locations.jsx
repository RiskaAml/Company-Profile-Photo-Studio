import { MapPin, Clock } from 'lucide-react'
import useReveal from '../../hooks/useReveal'

const LOCATIONS = [
  {
    name: 'Lamongan Kota',
    address: 'Ruko, Jl. Veteran No.33A, Mendalan, Banjarmendalan, Kec. Lamongan, Kabupaten Lamongan, Jawa Timur 62212',
    hours: '08.20 – 20.00',
    mapsUrl: 'https://maps.app.goo.gl/RQAriUJ4XNEDUSKd7',
    badge: 'Buka Malam',
    badgeColor: 'text-mint-DEFAULT bg-mint-DEFAULT/10 border-mint-DEFAULT/20',
    dot: 'bg-mint-DEFAULT',
  },
  {
    name: 'Bojonegoro',
    address: 'RT.21/RW.05, Ngumpak, Ngumpak Dalem, Dander, Bojonegoro Regency, East Java 62171',
    hours: '08.20 – 16.30',
    mapsUrl: 'https://maps.app.goo.gl/w1po2BD1HQoxxhDQA',
    badge: null,
    dot: 'bg-purple-DEFAULT',
  },
  {
    name: 'Dukun, Gresik',
    address: 'Jl. Raya Dukun, Sembungan Kidul, Kec. Dukun, Kabupaten Gresik, Jawa Timur 61155',
    hours: '08.20 – 16.30',
    mapsUrl: 'https://maps.app.goo.gl/skEWKSbi2rnya7DRA',
    badge: null,
    dot: 'bg-pink',
  },
  {
    name: 'Benjeng, Gresik',
    address: 'Jalan raya, RT.16/RW.3, Karangpundut, Punduttrate, Kec. Benjeng, Kabupaten Gresik, Jawa Timur 61172',
    hours: '08.20 – 16.30 (konfirmasi WA dulu)',
    mapsUrl: 'https://maps.app.goo.gl/fUmuppC5quB36MvG7',
    badge: 'Konfirmasi Dulu',
    badgeColor: 'text-yellow bg-yellow/10 border-yellow/20',
    dot: 'bg-yellow',
  },
]

export default function Locations() {
  const ref = useReveal()
  return (
    <section id="lokasi" ref={ref} className="section-y bg-[#F0FDFB]">
      <div className="container-x">
        <div className="mb-12">
          <div className="reveal flex flex-col md:flex-row md:items-end justify-between gap-4">
            <h2 className="font-display font-bold text-2xl md:text-3xl text-main">4 Studio Kami.</h2>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {LOCATIONS.map((l, i) => (
            <div key={l.name}
              className="reveal bg-white border border-[#C5F0EA] rounded-2xl p-4 hover:border-mint-DEFAULT/40 transition-colors"
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
                className="mt-3 block text-xs font-semibold text-mint-DEFAULT hover:underline">Open in Maps →</a>
            </div>
          ))}
        </div>

        <div className="reveal rounded-2xl overflow-hidden border border-[#C5F0EA]">
          <div className="bg-white px-4 py-2.5 border-b border-[#C5F0EA] flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-mint-DEFAULT" />
            <span className="text-sm font-semibold text-main">Dolananpoto Studio — Sidoarjo Kota</span>
          </div>
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63173.6!2d112.7!3d-7.45!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zN8KwMjcnMDAuMCJTIDExMsKwNDInMDAuMCJF!5e0!3m2!1sen!2sid!4v1"
            width="100%" height="280" style={{ border:0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Lokasi AF Studio" />
        </div>
      </div>
    </section>
  )
}
