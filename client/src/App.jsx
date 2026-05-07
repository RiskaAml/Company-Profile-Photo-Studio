import { BrowserRouter } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import Portfolio from './components/Portfolio'
import About from './components/About'
import Testimonials from './components/Testimonials'
import Pricing from './components/Pricing'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-cream">
        <Navbar />
        <main>
          <Hero />
          <Services />
          <Portfolio />
          <About />
          <Pricing />
          <Testimonials />
          <Contact />
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
