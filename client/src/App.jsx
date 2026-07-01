import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import CookieBanner from './components/CookieBanner'
import Home from './pages/Home'
import ServiceDetail from './pages/ServiceDetail'
import GalleryPage from './pages/GalleryPage'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import BookingPage from './pages/BookingPage'
import RentalBookingPage from './pages/RentalBookingPage'
import InvoicePage from './pages/InvoicePage'
import OrderHistoryPage from './pages/OrderHistoryPage'
import AdminPage from './pages/AdminPage'
import SelfPhotoPrice from './pages/SelfPhotoPrice'
import RentalCameraPrice from './pages/RentalCameraPrice'
import RentalIphonePage from './pages/RentalIphonePage'
import RentalIphoneBookingPage from './pages/RentalIphoneBookingPage'
import { AuthProvider, useAuth } from './context/AuthContext'
import { BookingProvider } from './context/BookingContext'

function RequireAuth({ children }) {
  const { user } = useAuth()
  const location = useLocation()
  if (!user) return <Navigate to="/masuk" state={{ from: location.pathname }} replace />
  return children
}

function RequireAdmin({ children }) {
  const { user } = useAuth()
  if (!user) return <Navigate to="/masuk" replace />
  if (!user.isAdmin) return <Navigate to="/" replace />
  return children
}

function AppRoutes() {
  return (
    <div className="min-h-screen bg-[#F0FDFB]">
      <Navbar />
      <Routes>
        <Route path="/"                element={<Home />} />
        <Route path="/layanan/:slug"   element={<ServiceDetail />} />
        <Route path="/selfphoto-harga" element={<SelfPhotoPrice />} />
        <Route path="/rental-kamera"        element={<RentalCameraPrice />} />
        <Route path="/layanan/rental-iphone" element={<RentalIphonePage />} />
        <Route path="/galeri"          element={<GalleryPage />} />
        <Route path="/masuk"           element={<LoginPage />} />
        <Route path="/daftar"          element={<SignUpPage />} />
        <Route path="/lupa-password"   element={<ForgotPasswordPage />} />
        <Route path="/invoice"         element={<InvoicePage />} />
        <Route path="/booking/selfphoto"
          element={<RequireAuth><BookingPage /></RequireAuth>}
        />
        <Route path="/booking/rental"
          element={<RequireAuth><RentalBookingPage /></RequireAuth>}
        />
        <Route path="/booking/rental-iphone"
          element={<RequireAuth><RentalIphoneBookingPage /></RequireAuth>}
        />
        <Route path="/riwayat"
          element={<RequireAuth><OrderHistoryPage /></RequireAuth>}
        />
        <Route path="/admin"
          element={<RequireAdmin><AdminPage /></RequireAdmin>}
        />
      </Routes>
      <CookieBanner />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <BookingProvider>
          <AppRoutes />
        </BookingProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}
