export default function CTA() {
  return (
    <section className="relative overflow-hidden bg-[#0A0A0F] py-16">
      <div className="absolute inset-0 bg-[#00E5CC]/5 pointer-events-none" />

      <div className="container-x relative z-10 text-center">
        <h2 className="font-display font-bold text-2xl md:text-3xl text-white mb-3">
          Masih ada pertanyaan?
        </h2>
        <p className="text-zinc-400 text-sm mb-8 max-w-sm mx-auto">
          Tim kami siap membantu kamu lewat WhatsApp.
        </p>
        <a href="https://wa.me/6281234567890"
          target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-[#00E5CC] text-[#0A0A0F] font-bold px-8 py-3 rounded-xl hover:bg-[#00B3A0] transition-colors text-sm">
          💬 Hubungi Kami via WhatsApp
        </a>
      </div>
    </section>
  )
}
