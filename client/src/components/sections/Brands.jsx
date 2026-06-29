import { Camera } from 'lucide-react'

const imgs = import.meta.glob('../../assets/brand/*.{png,jpg,jpeg,webp,svg}',
  { eager: true, query: '?url', import: 'default' })
const img = (n) => imgs[`../../assets/brand/${n}`] ?? ''

const BRANDS = [
  { name: 'Brand 1', logo: img('brand-1.png') },
  { name: 'Brand 2', logo: img('brand-2.png') },
  { name: 'Brand 3', logo: img('brand-3.png') },
  { name: 'Brand 4', logo: img('brand-4.png') },
  { name: 'Brand 5', logo: img('brand-5.png') },
]

export default function Brands() {
  return (
    <section className="section-y bg-[#F0FDFB]">
      <div className="container-x">
        <div className="mb-8 text-center">
          <h2 className="font-display font-bold text-2xl md:text-3xl text-main">
            Brand & Kolaborasi
          </h2>
        </div>

        <div className="flex flex-col items-center gap-4">
          {/* Row 1 - 3 cards */}
          <div className="flex gap-4 justify-center flex-wrap">
            {BRANDS.slice(0, 3).map((b, i) => (
              <div key={i} className="bg-white border border-[#C5F0EA]
                rounded-2xl w-40 h-24 flex items-center justify-center p-4">
                <img src={b.logo} alt={b.name}
                  className="w-full h-full object-contain" />
              </div>
            ))}
          </div>
          {/* Row 2 - 2 cards */}
          <div className="flex gap-4 justify-center flex-wrap">
            {BRANDS.slice(3, 5).map((b, i) => (
              <div key={i} className="bg-white border border-[#C5F0EA]
                rounded-2xl w-40 h-24 flex items-center justify-center p-4">
                <img src={b.logo} alt={b.name}
                  className="w-full h-full object-contain" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
