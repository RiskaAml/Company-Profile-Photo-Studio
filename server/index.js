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
app.get('/api/health', (_, res) => res.json({ status: 'ok' }))
app.post('/api/track',  (_, res) => res.json({ ok: true }))

const dist = path.join(__dirname, '../client/dist')
app.use(express.static(dist))
app.get('*', (_, res) => res.sendFile(path.join(dist, 'index.html')))

app.listen(PORT, () => console.log(`🚀 AF Studio → http://localhost:${PORT}`))
