import { ArrowRight, Zap, Camera, Smartphone, Aperture } from 'lucide-react'
import PhotoSlot from '../PhotoSlot'

const imgs = import.meta.glob('../../assets/hero/*.{png,jpg,jpeg,webp,svg}', {
  eager: true,
  query: '?url',
  import: 'default'
})

const img = (n) => imgs[`../../assets/hero/${n}`] ?? ''


const STATS = [
  { val: 'Gresik', label: 'Kec. Benjeng' },
  { val: 'Gresik', label: 'Kec. Dukun' },
  { val: 'Lamongan', label: 'Lamongan Kota' },
  { val: 'Bojonegoro', label: 'Kec. Dander' },
]


const SERVICES = [
  {
    icon: Camera,
    title: "Photoshoot",
    desc: "Profesional"
  },
  {
    icon: Aperture,
    title: "SelfPhoto",
    desc: "Fun & Unlimited"
  },
  {
    icon: Camera,
    title: "Rental Kamera",
    desc: "Lengkap"
  },
  {
    icon: Smartphone,
    title: "Rental iPhone",
    desc: "Praktis"
  }
]


export default function Hero() {
  return (
    <section className="
      relative 
      min-h-screen 
      flex 
      items-center 
      pt-16 
      overflow-hidden 
      bg-[#F0FDFB]
    ">


      {/* decoration */}
      <div className="
        absolute 
        -left-40 
        bottom-10 
        w-96 
        h-96 
        bg-[#BDF7EE]/40 
        rounded-full 
        blur-3xl
      "/>


      <div className="
        absolute 
        top-20 
        right-0 
        w-72 
        h-72 
        bg-[#FFD6E8]/30 
        rounded-full 
        blur-3xl
      "/>



      <div className="
        container-x 
        py-10 
        grid 
        md:grid-cols-2 
        gap-14 
        items-center 
        w-full
      ">


        {/* LEFT */}

        <div>


          <div className="
            inline-flex 
            items-center 
            gap-2 
            bg-white
            border
            border-[#BDF7EE]
            px-4 
            py-2 
            rounded-full 
            text-xs 
            font-semibold 
            text-zinc-700
            mb-7
          ">
            <Zap size={13} className="text-[#10CDB8] fill-[#10CDB8]" />

            Photoshoot · SelfPhoto · Rental
          </div>



          <h1 className="
            font-display
            font-bold
            text-5xl
            lg:text-6xl
            leading-[1.05]
            text-main
          ">

            <span className="grad-text"> Dolananpoto
            </span>


            <br/>

            <span>
              Studio
            </span>


          </h1>



          <p className="
            mt-6
            text-zinc-500
            max-w-md
            leading-relaxed
          ">
            Dari photoshoot profesional, self photo yang seru,
            sampai rental kamera & iPhone.
            Semua kebutuhan foto dan konten ada di Dolananpoto Studio.
          </p>



          {/* services */}

          <div className="
            mt-8
            bg-white
            rounded-2xl
            border
            border-[#DDF6F2]
            p-4
            grid
            grid-cols-2
            gap-4
          ">


          {SERVICES.map((item)=>{

            const Icon = item.icon

            return (

              <div 
                key={item.title}
                className="
                  flex
                  gap-3
                  items-center
                "
              >

                <div className="
                  w-9
                  h-9
                  rounded-xl
                  bg-[#EFFFFB]
                  flex
                  items-center
                  justify-center
                ">

                  <Icon 
                    size={18}
                    className="text-[#10CDB8]"
                  />

                </div>


                <div>

                  <p className="
                    text-sm
                    font-bold
                  ">
                    {item.title}
                  </p>

                  <p className="
                    text-xs
                    text-zinc-400
                  ">
                    {item.desc}
                  </p>

                </div>

              </div>

            )

          })}


          </div>




          <div className="
            mt-8
            flex
            items-center
            gap-5
          ">


          <a
          href="https://wa.me/6281234567890"
          target="_blank"
          className="
            flex
            items-center
            gap-2
            bg-[#10CDB8]
            hover:bg-[#08bba7]
            text-black
            font-bold
            px-7
            py-3
            rounded-xl
            transition
          "
          >

            Book Sekarang

            <ArrowRight size={16}/>

          </a>


          </div>




          {/* location */}

          <div className="
            mt-8
            grid
            grid-cols-2
            sm:grid-cols-4
            gap-3
          ">


          {STATS.map((s)=>(

            <div
            key={s.label}
            className="
              bg-[#0A0A0F]
              rounded-xl
              px-3
              py-3
            "
            >

              <div className="
                text-[#FFD83D]
                font-bold
                text-sm
              ">
                {s.val}
              </div>


              <div className="
                text-zinc-400
                text-xs
              ">
                {s.label}
              </div>


            </div>


          ))}


          </div>




        </div>




        {/* RIGHT IMAGE */}

        <div 
        className="
          relative
          rounded-3xl
          overflow-hidden
          border
          border-[#C5F0EA]
          shadow-xl
        "
        style={{
          aspectRatio:"1/1"
        }}
        >

          <PhotoSlot
          src={img('hero-1.png')}
          alt="Dolananpoto Studio"
          className="w-full h-full rounded-none"
          />


        </div>



      </div>


    </section>
  )
}