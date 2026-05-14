import Hero from '../components/sections/Hero'
import Services from '../components/sections/Services'
import Rooms from '../components/sections/Rooms'
import GalleryPreview from '../components/sections/GalleryPreview'
import Testimonials from '../components/sections/Testimonials'
import Locations from '../components/sections/Locations'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Rooms />
      <GalleryPreview />
      <Testimonials />
      <Locations />
      <Footer />
    </>
  )
}
