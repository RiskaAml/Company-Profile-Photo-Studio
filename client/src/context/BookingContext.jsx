import { createContext, useContext, useState } from 'react'

const BookingCtx = createContext()

const DUMMY_BOOKINGS = [
  {
    orderId: 'DP-20240101-001',
    type: 'Self Photo',
    package: 'Paket Premium 1 Jam',
    location: 'Sidoarjo Kota',
    payment: 'QRIS',
    date: '2024-01-15',
    status: 'Selesai',
    total: 120000,
    notes: '',
  },
  {
    orderId: 'DP-20240210-002',
    type: 'Rental Kamera',
    package: 'iPhone + Gimbal',
    location: 'Waru',
    payment: 'Transfer Bank',
    date: '2024-02-10',
    status: 'Selesai',
    total: 100000,
    notes: 'Perlu tripod juga',
  },
]

export function BookingProvider({ children }) {
  const [bookings, setBookings] = useState(DUMMY_BOOKINGS)

  const addBooking = (booking) => {
    const orderId = `DP-${Date.now()}`
    const newBooking = { ...booking, orderId, status: 'Menunggu Konfirmasi' }
    setBookings(prev => [newBooking, ...prev])
    return orderId
  }

  return (
    <BookingCtx.Provider value={{ bookings, addBooking }}>
      {children}
    </BookingCtx.Provider>
  )
}

export const useBooking = () => useContext(BookingCtx)
