import cors from 'cors'
import express from 'express'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
import authRoutes from './routes/authRoutes.js'
import todoRoutes from './routes/todoRoutes.js'
import authMidWare from './middleware/authmd.js'

const app = express()
const PORT = process.env.PORT || 5003

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// middleware
app.use(express.json())
app.use(cors())

app.use(express.static(path.join(__dirname, '../public')))


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

app.use('/auth', authRoutes)
app.use('/todos',authMidWare, todoRoutes)


app.listen(PORT, () => {
    console.log(`Server has started at ${PORT}`)
})



