import express from 'express'
import cors from 'cors'
import router from './routes/index.routes.js'

//CONFIG
const app = express()
app.use(cors())
app.use(express.json())
app.use(router)

//LISTEN
const PORT = 5000
app.listen(PORT, () => console.log('Server running in 5000 port'))
