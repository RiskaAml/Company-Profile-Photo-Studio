import Hero from '../components/sections/Hero'
import Services from '../components/sections/Services'
import Brands from '../components/sections/Brands'
import GalleryPreview from '../components/sections/GalleryPreview'
import Locations from '../components/sections/Locations'
import FAQ from '../components/sections/FAQ'
import CTA from '../components/sections/CTA'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Brands />
      <GalleryPreview />
      <Locations />
      <FAQ />
      <CTA />
      <Footer />
    </>
  )
}
