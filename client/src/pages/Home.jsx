import Hero from '../components/sections/Hero'
import Brands from '../components/sections/Brands'
import Services from '../components/sections/Services'
import GalleryPreview from '../components/sections/GalleryPreview'
import Testimonials from '../components/sections/Testimonials'
import Locations from '../components/sections/Locations'
import FAQ from '../components/sections/FAQ'
import CTA from '../components/sections/CTA'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <>
      <Hero />
      <Brands />
      <Services />
      <GalleryPreview />
      <Testimonials />
      <Locations />
      <FAQ />
      <CTA />
      <Footer />
    </>
  )
}
