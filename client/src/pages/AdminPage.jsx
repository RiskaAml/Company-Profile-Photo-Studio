import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Download, Folder, Upload, Send, Check, ArrowLeft } from 'lucide-react'
import { useBooking } from '../context/BookingContext'
import Footer from '../components/Footer'

const DUMMY_FOLDERS = [
  { customer: 'Ayu Maharani',   date: '2024-01-15', files: 23, status: 'Foto Sudah Dikirim',   phone: '081234567890' },
  { customer: 'Reza & Dinda',   date: '2024-02-10', files: 41, status: 'Belum Dikirim',        phone: '081234567891' },
  { customer: 'Citra Dewi',     date: '2024-02-18', files: 15, status: 'Foto Sudah Dikirim',   phone: '081234567892' },
  { customer: 'Budi Santoso',   date: '2024-03-05', files:  8, status: 'Belum Dikirim',        phone: '081234567893' },
  { customer: 'Tim KKN UMSIDA', date: '2024-03-22', files: 67, status: 'Foto Sudah Dikirim',   phone: '081234567894' },
]

export default function AdminPage() {
  const navigate = useNavigate()
  const { bookings } = useBooking()
  const [folders, setFolders]   = useState(DUMMY_FOLDERS)
  const [activeTab, setActiveTab] = useState('bookings')
  const [toast, setToast]       = useState('')

  const showToast = (msg) => {
    setToast(msg)
    setTimeout(() => setToast(''), 3000)
  }

  const exportCsv = () => {
    const headers = ['Order ID', 'Tipe', 'Paket', 'Lokasi', 'Pembayaran', 'Tanggal', 'Status', 'Total']
    const rows = bookings.map(b => [
      b.orderId, b.type, b.package, b.location, b.payment, b.date, b.status, `Rp ${(b.total||0).toLocaleString('id-ID')}`
    ])
    const csv = [headers, ...rows].map(r => r.map(c => `"${c}"`).join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url  = URL.createObjectURL(blob)
    const a = document.createElement('a'); a.href = url; a.download = 'bookings.csv'; a.click()
    URL.revokeObjectURL(url)
  }

  const toggleStatus = (i) => {
    setFolders(prev => prev.map((f, idx) => idx !== i ? f : {
      ...f, status: f.status === 'Foto Sudah Dikirim' ? 'Belum Dikirim' : 'Foto Sudah Dikirim'
    }))
  }

  const sendWa = (f) => {
    showToast(`✅ Link berhasil dikirim ke WhatsApp ${f.customer}!`)
  }

  return (
    <>
      <div className="min-h-screen bg-[#F0FDFB] pt-20 pb-16">
        <div className="container-x">

          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <button onClick={() => navigate('/')} className="text-sub hover:text-main transition-colors">
                <ArrowLeft size={18} />
              </button>
              <div>
                <h1 className="font-display font-bold text-2xl text-main">Admin Dashboard</h1>
                <p className="text-sub text-sm">Dolananpoto Studio</p>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-6 border-b border-[#C5F0EA]">
            {['bookings', 'nas'].map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className={`px-4 py-2.5 text-sm font-semibold border-b-2 transition-colors -mb-px ${activeTab === tab ? 'border-mint-DEFAULT text-mint-DEFAULT' : 'border-transparent text-sub hover:text-main'}`}>
                {tab === 'bookings' ? '📋 Data Booking' : '🗂️ NAS Storage'}
              </button>
            ))}
          </div>

          {/* Bookings tab */}
          {activeTab === 'bookings' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <p className="text-sub text-sm">{bookings.length} total booking</p>
                <button onClick={exportCsv}
                  className="flex items-center gap-2 bg-mint-DEFAULT text-d0 font-bold text-sm px-4 py-2 rounded-xl hover:bg-mint-dark transition-colors glow-mint">
                  <Download size={14} /> Export CSV
                </button>
              </div>

              <div className="bg-white border border-[#C5F0EA] rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-zinc-100">
                        <th className="text-left px-4 py-3 text-sub font-semibold text-xs uppercase tracking-wider">Order ID</th>
                        <th className="text-left px-4 py-3 text-sub font-semibold text-xs uppercase tracking-wider">Tipe</th>
                        <th className="text-left px-4 py-3 text-sub font-semibold text-xs uppercase tracking-wider">Paket</th>
                        <th className="text-left px-4 py-3 text-sub font-semibold text-xs uppercase tracking-wider">Lokasi</th>
                        <th className="text-left px-4 py-3 text-sub font-semibold text-xs uppercase tracking-wider">Tanggal</th>
                        <th className="text-left px-4 py-3 text-sub font-semibold text-xs uppercase tracking-wider">Status</th>
                        <th className="text-right px-4 py-3 text-sub font-semibold text-xs uppercase tracking-wider">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookings.map((b, i) => (
                        <tr key={b.orderId || i} className="border-b border-zinc-50 hover:bg-[#F0FDFB] transition-colors">
                          <td className="px-4 py-3 font-mono text-xs text-sub">{b.orderId}</td>
                          <td className="px-4 py-3 font-semibold text-main">{b.type}</td>
                          <td className="px-4 py-3 text-main text-xs">{b.package}</td>
                          <td className="px-4 py-3 text-sub text-xs">{b.location}</td>
                          <td className="px-4 py-3 text-sub text-xs">{b.date}</td>
                          <td className="px-4 py-3">
                            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                              b.status === 'Selesai' ? 'text-mint-DEFAULT bg-mint-DEFAULT/10' :
                              b.status === 'Dibatalkan' ? 'text-red-400 bg-red-400/10' :
                              'text-yellow bg-yellow/10'
                            }`}>{b.status}</span>
                          </td>
                          <td className="px-4 py-3 text-right font-display font-bold text-mint-DEFAULT">
                            Rp {(b.total || 0).toLocaleString('id-ID')}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {bookings.length === 0 && (
                    <div className="text-center py-12 text-sub text-sm">Belum ada data booking.</div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* NAS Storage tab */}
          {activeTab === 'nas' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <p className="text-sub text-sm">{folders.length} folder pelanggan</p>
                <button onClick={() => showToast('📁 Folder baru berhasil dibuat!')}
                  className="flex items-center gap-2 border border-[#C5F0EA] text-main font-semibold text-sm px-4 py-2 rounded-xl hover:border-[#A8E6DF] transition-colors">
                  <Folder size={14} /> Buat Folder Baru
                </button>
              </div>

              <div className="space-y-3">
                {folders.map((f, i) => (
                  <div key={i} className="bg-white border border-[#C5F0EA] rounded-2xl p-5">
                    <div className="flex items-center justify-between gap-4 flex-wrap">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
                          <Folder size={18} className="text-amber-500" />
                        </div>
                        <div>
                          <div className="font-display font-bold text-sm text-main">{f.customer}</div>
                          <div className="text-sub text-xs">{f.date} · {f.files} file</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 flex-wrap">
                        <button
                          onClick={() => toggleStatus(i)}
                          className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all ${
                            f.status === 'Foto Sudah Dikirim'
                              ? 'border-mint-DEFAULT text-mint-DEFAULT bg-mint-DEFAULT/5'
                              : 'border-[#A8E6DF] text-sub hover:border-mint-DEFAULT hover:text-mint-DEFAULT'
                          }`}>
                          {f.status === 'Foto Sudah Dikirim' && <Check size={12} />}
                          {f.status}
                        </button>

                        <button onClick={() => showToast(`✅ File berhasil diupload ke folder ${f.customer}!`)}
                          className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border border-[#C5F0EA] text-sub hover:text-main hover:border-[#A8E6DF] transition-colors">
                          <Upload size={12} /> Upload
                        </button>

                        <button onClick={() => sendWa(f)}
                          className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-emerald-500 text-white hover:bg-emerald-600 transition-colors">
                          <Send size={12} /> Kirim Link via WA
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-5 right-5 z-50 bg-d1 text-white text-sm font-medium px-5 py-3 rounded-xl border border-d3 shadow-2xl animate-slide-up">
          {toast}
        </div>
      )}

      <Footer />
    </>
  )
}
