import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import CookieBanner from './components/CookieBanner'
import Home from './pages/Home'
import ServiceDetail from './pages/ServiceDetail'
import GalleryPage from './pages/GalleryPage'

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-zinc-50 dark:bg-d0 transition-colors duration-300">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/layanan/:slug" element={<ServiceDetail />} />
          <Route path="/galeri" element={<GalleryPage />} />
        </Routes>
        <CookieBanner />
      </div>
    </BrowserRouter>
  )
}
