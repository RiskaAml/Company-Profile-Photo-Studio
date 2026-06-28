import { MapPin, Clock, Phone } from 'lucide-react'
import useReveal from '../../hooks/useReveal'

const LOCS = [
  { id:1, name:'Sidoarjo Kota',    addr:'Jl. Raya Sidoarjo No. 123', hours:'Sen–Min 09.00–21.00', phone:'0812-3456-7890', badge:'Main Studio', badgeColor:'text-mint-DEFAULT bg-mint-DEFAULT/10 border-mint-DEFAULT/20', dot:'bg-mint-DEFAULT' },
  { id:2, name:'Waru',             addr:'Jl. Raya Waru No. 45',      hours:'Sen–Min 09.00–21.00', phone:'0812-3456-7891', badge:null, dot:'bg-zinc-400' },
  { id:3, name:'Gedangan',         addr:'Jl. Raya Gedangan No. 78',  hours:'Sel–Min 10.00–20.00', phone:'0812-3456-7892', badge:'New!', badgeColor:'text-pink bg-pink/10 border-pink/20', dot:'bg-pink' },
  { id:4, name:'Surabaya Selatan', addr:'Jl. Raya Jemursari No. 12', hours:'Sen–Sab 10.00–21.00', phone:'0812-3456-7893', badge:null, dot:'bg-purple-DEFAULT' },
]

export default function Locations() {
  const ref = useReveal()
  return (
    <section id="lokasi" ref={ref} className="section-y bg-[#F0FDFB]">
      <div className="container-x">
        <div className="mb-12">
          <p className="reveal text-xs font-semibold text-mint-DEFAULT uppercase tracking-widest mb-3">— Find Us</p>
          <div className="reveal flex flex-col md:flex-row md:items-end justify-between gap-4">
            <h2 className="font-display font-bold text-2xl md:text-3xl text-main">Dekat dari mana saja.</h2>
            <p className="text-sub text-sm max-w-xs">4 studio di Sidoarjo & Surabaya. Pilih yang paling dekat.</p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {LOCS.map((l, i) => (
            <div key={l.id}
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
                <div className="flex items-start gap-1.5"><MapPin size={11} className="mt-0.5 flex-shrink-0 text-mint-DEFAULT" /><span>{l.addr}</span></div>
                <div className="flex items-center gap-1.5"><Clock size={11} className="flex-shrink-0 text-mint-DEFAULT" /><span>{l.hours}</span></div>
                <div className="flex items-center gap-1.5"><Phone size={11} className="flex-shrink-0 text-mint-DEFAULT" />
                  <a href={`https://wa.me/62${l.phone.replace(/\D/g,'').slice(1)}`} target="_blank" rel="noopener noreferrer" className="hover:text-mint-DEFAULT transition-colors">{l.phone}</a>
                </div>
              </div>
              <a href={`https://maps.google.com/?q=Dolananpoto+Studio+${l.name}`} target="_blank" rel="noopener noreferrer"
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
