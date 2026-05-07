import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

// ─── Health check ─────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', studio: 'Lumora Studio', time: new Date().toISOString() })
})

// ─── Contact form ──────────────────────────────────────────────
app.post('/api/contact', (req, res) => {
  const { name, phone, service, message } = req.body

  if (!name || !phone) {
    return res.status(400).json({ error: 'Nama dan nomor telepon wajib diisi.' })
  }

  // In production: send to email / WhatsApp API / save to DB
  console.log('📬 Inquiry baru dari website:')
  console.log(`   Nama    : ${name}`)
  console.log(`   Phone   : ${phone}`)
  console.log(`   Layanan : ${service || '-'}`)
  console.log(`   Pesan   : ${message || '-'}`)
  console.log('─'.repeat(40))

  res.json({
    success: true,
    message: 'Pesan berhasil diterima. Kami akan segera menghubungi kamu!'
  })
})

// ─── Serve React build (production) ───────────────────────────
const distPath = path.join(__dirname, '../client/dist')
app.use(express.static(distPath))
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'))
})

app.listen(PORT, () => {
  console.log(`🌟 Lumora Studio server running on http://localhost:${PORT}`)
})
