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
    <section className="py-4 bg-[#F0FDFB]">
      <div className="container-x">
        <div className="flex gap-6 justify-center flex-wrap">
          {BRANDS.map((b, i) => (
            <div key={i} className="relative w-20 h-20 rounded-full flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-white/60 backdrop-blur-md rounded-full" />
              <img src={b.logo} alt={b.name}
                className="relative z-10 w-12 h-12 object-contain" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
