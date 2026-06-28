import { Link } from 'react-router-dom'
import { ShoppingBag, Clock, CheckCircle, XCircle, ArrowLeft } from 'lucide-react'
import { useBooking } from '../context/BookingContext'
import Footer from '../components/Footer'

const STATUS_ICON = {
  'Selesai':              <CheckCircle size={14} className="text-mint-DEFAULT" />,
  'Menunggu Konfirmasi':  <Clock size={14} className="text-yellow" />,
  'Dibatalkan':           <XCircle size={14} className="text-red-400" />,
}

const STATUS_COLOR = {
  'Selesai':              'text-mint-DEFAULT bg-mint-DEFAULT/10',
  'Menunggu Konfirmasi':  'text-yellow bg-yellow/10',
  'Dibatalkan':           'text-red-400 bg-red-400/10',
}

export default function OrderHistoryPage() {
  const { bookings } = useBooking()

  return (
    <>
      <div className="min-h-screen bg-[#F0FDFB] pt-20 pb-16">
        <div className="container-x max-w-3xl">
          <Link to="/" className="inline-flex items-center gap-1.5 text-sub hover:text-main text-sm mb-6 transition-colors">
            <ArrowLeft size={15} /> Kembali ke Beranda
          </Link>

          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-mint-DEFAULT/10 flex items-center justify-center">
              <ShoppingBag size={18} className="text-mint-DEFAULT" />
            </div>
            <div>
              <h1 className="font-display font-bold text-2xl text-main">Riwayat Pembelian</h1>
              <p className="text-sub text-sm">{bookings.length} transaksi tercatat</p>
            </div>
          </div>

          {bookings.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-5xl mb-4">🗂️</p>
              <h2 className="font-display font-bold text-lg text-main mb-2">Belum ada transaksi</h2>
              <p className="text-sub text-sm mb-6">Booking layanan kami sekarang!</p>
              <Link to="/#layanan" className="inline-flex bg-mint-DEFAULT text-d0 font-bold text-sm px-6 py-2.5 rounded-xl hover:bg-mint-dark transition-colors glow-mint">
                Lihat Layanan
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {bookings.map((b, i) => (
                <div key={b.orderId || i}
                  className="bg-white border border-[#C5F0EA] rounded-2xl p-5 hover:border-[#A8E6DF] transition-colors">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-display font-bold text-sm text-main">{b.type}</span>
                        <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full ${STATUS_COLOR[b.status] || STATUS_COLOR['Menunggu Konfirmasi']}`}>
                          {STATUS_ICON[b.status] || STATUS_ICON['Menunggu Konfirmasi']}
                          {b.status}
                        </span>
                      </div>
                      <p className="text-sub text-xs font-mono">{b.orderId}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="font-display font-bold text-mint-DEFAULT">Rp {(b.total || b.price || 0).toLocaleString('id-ID')}</div>
                      <div className="text-sub text-xs mt-0.5">{b.date}</div>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-3 gap-2 text-xs">
                    <div className="bg-[#F0FDFB] rounded-lg px-3 py-2">
                      <div className="text-sub mb-0.5">Paket</div>
                      <div className="text-main font-medium">{b.package}</div>
                    </div>
                    <div className="bg-[#F0FDFB] rounded-lg px-3 py-2">
                      <div className="text-sub mb-0.5">Lokasi</div>
                      <div className="text-main font-medium">{b.location}</div>
                    </div>
                    <div className="bg-[#F0FDFB] rounded-lg px-3 py-2">
                      <div className="text-sub mb-0.5">Pembayaran</div>
                      <div className="text-main font-medium">{b.payment}</div>
                    </div>
                  </div>

                  {b.notes && (
                    <div className="mt-3 text-xs text-sub border-t border-zinc-100 pt-2">
                      <span className="font-medium">Catatan:</span> {b.notes}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  )
}
