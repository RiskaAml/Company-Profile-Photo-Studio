import useReveal from '../../hooks/useReveal'

const FAQS = [
  {
    q: "Harus booking dulu atau bisa langsung datang?",
    a: "Untuk cabang Dukun dan Lamkot bisa langsung datang ke lokasi sesuai jam kerja. Khusus cabang Benjeng, lebih aman konfirmasi terlebih dahulu melalui WhatsApp atau bisa langsung datang selama studio sedang buka."
  },
  {
    q: "Apakah cabang Dukun dan Lamkot bisa booking terlebih dahulu?",
    a: "Belum bisa booking ya kak. Silakan langsung datang ke lokasi dan mengambil nomor antrean yang tersedia. Jika sedang antre, kakak bisa keluar sebentar terlebih dahulu."
  },
  {
    q: "Jam bukanya mulai jam berapa?",
    a: "Cabang Dukun buka pukul 08.20–16.30 dan cabang Lamkot buka pukul 08.20–20.00. Untuk cabang Benjeng bisa menyesuaikan dengan konfirmasi WhatsApp terlebih dahulu. Jam normalnya pukul 08.20–16.30."
  },
  {
    q: "Berapa lama durasi pengiriman foto setelah sesi foto?",
    a: "Kurang lebih sekitar 3 jam. Jika sudah lebih dari 3 jam tetapi foto belum dikirim, bisa menghubungi WhatsApp kami."
  },
  {
    q: "Apakah kostum dan aksesoris berbayar?",
    a: "Semua kostum dan aksesoris tersedia secara gratis ya kak, dengan catatan setelah digunakan harap dikembalikan ke tempat semula."
  },
  {
    q: "Apakah harga fotobox dan selfstudio berbeda?",
    a: "Harganya sama ya kak. Yang membedakan hanya bagian background. Untuk selfstudio reguler, background-nya seperti foto studio pada umumnya, sedangkan fotobox menggunakan background berbentuk box/kotak."
  },
  {
    q: "Apakah boleh memakai sepatu saat foto?",
    a: "Boleh ya kak, asalkan sepatu dalam keadaan bersih agar tidak mengotori background."
  },
  {
    q: "Apakah tersedia tempat untuk ganti baju?",
    a: "Tersedia ya kak, tempat ganti berada di dalam studio."
  },
  {
    q: "Apakah boleh membawa kue dan balon?",
    a: "Boleh kak, tetapi mohon berhati-hati agar tidak mengotori area studio. Di studio juga sudah tersedia aksesoris kue palsu."
  },
  {
    q: "Apakah hasil fotonya mirror?",
    a: "Hasil fotonya normal ya kak, tidak mirror."
  },
  {
    q: "Apakah waktu berhenti saat mengganti kostum?",
    a: "Waktu tetap berjalan ya kak. Kecuali untuk order 2x durasi, waktu bisa dihentikan sementara untuk mengganti baju. Selain itu juga bisa mengganti warna background."
  },
  {
    q: "Apakah ada batasan untuk mengganti kostum?",
    a: "Tidak ada batasan ganti kostum ya kak, selama waktu masih cukup, kakak bebas berganti kostum."
  },
]

export default function FAQ() {
  const ref = useReveal()

  return (
    <section id="faq" ref={ref} className="section-y bg-[#F0FDFB]">
      <div className="container-x">
        <div className="mb-12">
          <div className="reveal">
            <h2 className="font-display font-bold text-2xl md:text-3xl text-main">Pertanyaan yang sering ditanyakan.</h2>
          </div>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {FAQS.map((faq, i) => (
            <div key={i} className="bg-[#0A0A0F] border border-[#252532] rounded-2xl p-4 flex-shrink-0 w-72">
              <p className="font-bold text-sm text-[#FACC15] mb-1">{faq.q}</p>
              <p className="text-sm text-white leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
