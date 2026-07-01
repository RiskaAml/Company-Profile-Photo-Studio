import useReveal from '../../hooks/useReveal'

const REVIEWS = [
  { id:1, name:'Ayu Maharani',   role:'Content Creator',  text:'Self photo di Dolananpoto hasilnya keren banget! Lighting bagus, backdrop banyak pilihan. Udah jadi langganan tiap bulan.', rating:5, tag:'Self Photo', tagColor:'text-mint-DEFAULT bg-mint-DEFAULT/10' },
  { id:2, name:'Reza & Dinda',   role:'Prewedding',       text:'Foto prewedding beyond expectation! Fotografernya sabar dan hasilnya natural banget. Highly recommended!', rating:5, tag:'Photoshoot', tagColor:'text-purple-DEFAULT bg-purple-DEFAULT/10' },
  { id:3, name:'Citra Dewi',     role:'Mahasiswi UMSIDA', text:'Foto wisuda elegan dan natural. Tim ramah, bikin nyaman dari awal sampai akhir.', rating:5, tag:'Photoshoot', tagColor:'text-purple-DEFAULT bg-purple-DEFAULT/10' },
  { id:4, name:'Budi Santoso',   role:'Owner UMKM',       text:'Foto produk jadi jauh lebih profesional. Penjualan naik signifikan setelah ganti foto pakai Dolananpoto!', rating:5, tag:'Photoshoot', tagColor:'text-purple-DEFAULT bg-purple-DEFAULT/10' },
  { id:5, name:'Tim KKN UMSIDA', role:'Mahasiswa',        text:'Sewa kamera seminggu untuk dokumentasi KKN. Harga terjangkau, kamera bagus, staff helpful.', rating:5, tag:'Rental', tagColor:'text-pink bg-pink/10' },
  { id:6, name:'Nadia Putri',    role:'Beauty Influencer',text:'Studio-nya instagramable! Props lengkap, hasilnya konsisten. Teman-teman sering tanya foto aku di mana.', rating:5, tag:'Self Photo', tagColor:'text-mint-DEFAULT bg-mint-DEFAULT/10' },
]

export default function Testimonials() {
  const ref = useReveal()
  return (
    <section id="testimoni" ref={ref} className="section-y bg-white">
      <div className="container-x">
        <div className="mb-8 md:mb-12">
          <p className="text-xs font-semibold text-[#00E5CC] uppercase tracking-widest mb-3">— TESTIMONI</p>
          <div className="reveal flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="font-display font-bold text-2xl md:text-3xl text-main mb-2">Jangan percaya kami dulu.</h2>
              <p className="text-sub text-sm max-w-lg">Baca dulu kata mereka yang sudah pernah foto di sini.</p>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <div className="flex gap-0.5">{[...Array(5)].map((_,i)=><span key={i} className="text-yellow text-base">★</span>)}</div>
              <span className="font-display font-bold text-main">4.9</span>
              <span className="text-sub text-sm">· 1.000+ ulasan</span>
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {REVIEWS.map((r, i) => (
            <div key={r.id}
              className="reveal bg-white border-2 border-zinc-300 rounded-xl p-3 hover:border-zinc-400 transition-colors"
              style={{ transitionDelay: `${i * 60}ms` }}>
              <div className="flex gap-0.5 mb-2">
                {[...Array(r.rating)].map((_,j)=><span key={j} className="text-yellow text-xs">★</span>)}
              </div>
              <p className="text-main text-xs leading-relaxed mb-3">"{r.text}"</p>
              <div className="flex items-center justify-between pt-3 border-t border-[#C5F0EA]">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-mint-DEFAULT/30 to-purple-DEFAULT/30 text-main font-display font-bold text-sm flex items-center justify-center flex-shrink-0">
                    {r.name[0]}
                  </div>
                  <div>
                    <div className="font-semibold text-main text-sm leading-none">{r.name}</div>
                    <div className="text-sub text-xs mt-0.5">{r.role}</div>
                  </div>
                </div>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${r.tagColor}`}>{r.tag}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
