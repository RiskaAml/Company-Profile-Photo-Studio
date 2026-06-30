import { useLocation, Link } from 'react-router-dom'
import { CheckCircle, MessageCircle, Home } from 'lucide-react'
import Footer from '../components/Footer'

export default function InvoicePage() {
  const { state } = useLocation()

  if (!state) return (
    <>
      <div className="min-h-screen bg-[#F0FDFB] flex items-center justify-center px-5 pt-16">
        <div className="text-center">
          <p className="text-4xl mb-4">📄</p>
          <h1 className="font-display font-bold text-xl text-main mb-2">Invoice tidak ditemukan</h1>
          <Link to="/" className="text-mint-DEFAULT font-semibold hover:underline">← Kembali ke Beranda</Link>
        </div>
      </div>
      <Footer />
    </>
  )

  const { orderId, type, package: pkg, location, payment, notes, total, date } = state

  return (
    <>
    <div className="min-h-screen bg-[#F0FDFB] pt-20 pb-16">
      <div className="container-x max-w-md">
        {/* Success header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 rounded-full bg-mint-DEFAULT/10 flex items-center justify-center mx-auto mb-4">
            <CheckCircle size={48} className="text-mint-DEFAULT" />
          </div>
          <h1 className="font-display font-bold text-2xl text-main mb-2">Pembayaran Berhasil!</h1>
          <p className="text-sub text-sm">Terima kasih telah mempercayakan momen kamu ke Dolananpoto Studio.</p>
        </div>

        {/* WA notification note */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3 mb-6 flex items-start gap-3">
          <MessageCircle size={18} className="text-emerald-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-emerald-700">
            Invoice akan dikirim ke <strong>WhatsApp kamu</strong> dalam beberapa menit. 
          </p>
        </div>

        {/* Invoice card */}
        <div className="bg-white border-2 border-zinc-300 rounded-2xl overflow-hidden">
          {/* Invoice header */}
          <div className="bg-gradient-to-r from-mint-DEFAULT/10 to-purple-DEFAULT/10 border-b border-zinc-200 px-6 py-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-sub font-medium uppercase tracking-wider">Invoice</p>
                <p className="font-display font-bold text-lg text-main mt-0.5">{orderId}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-sub">Tanggal</p>
                <p className="text-sm font-semibold text-main">{date}</p>
              </div>
            </div>
          </div>

          {/* Invoice body */}
          <div className="px-6 py-5 space-y-3">
            <div className="flex justify-between items-start">
              <span className="text-sub text-sm">Layanan</span>
              <span className="text-main text-sm font-semibold text-right max-w-[60%]">{type}</span>
            </div>
            <div className="flex justify-between items-start">
              <span className="text-sub text-sm">Paket</span>
              <span className="text-main text-sm font-semibold text-right max-w-[60%]">{pkg}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sub text-sm">Lokasi</span>
              <span className="text-main text-sm font-semibold">{location}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sub text-sm">Pembayaran</span>
              <span className="text-main text-sm font-semibold">{payment}</span>
            </div>
            {notes && (
              <div className="flex justify-between items-start">
                <span className="text-sub text-sm">Catatan</span>
                <span className="text-main text-sm text-right max-w-[60%]">{notes}</span>
              </div>
            )}
            <div className="flex justify-between items-center border-t border-zinc-200 pt-3 mt-3">
              <span className="font-display font-bold text-main">Total</span>
              <span className="font-display font-bold text-xl text-mint-DEFAULT">Rp {total.toLocaleString('id-ID')}</span>
            </div>
          </div>

        </div>

        {/* Actions */}
        <div className="mt-6">
          <Link to="/"
            className="w-full flex items-center justify-center gap-2 border-2 border-zinc-300 text-main font-semibold text-sm py-2.5 rounded-xl hover:border-zinc-400 transition-colors">
            <Home size={15} /> Kembali ke Beranda
          </Link>
        </div>

        <p className="text-center text-xs text-sub mt-6">
          Lihat semua riwayat booking di{' '}
          <Link to="/riwayat" className="text-mint-DEFAULT hover:underline">Riwayat Pembelian</Link>
        </p>
      </div>
    </div>
    <Footer />
    </>
  )
}
