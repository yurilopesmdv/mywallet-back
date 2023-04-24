import express from 'express'
import cors from 'cors'
import router from './routes/index.routes.js'

//CONFIG
const app = express()
app.use(cors())
app.use(express.json())
app.use(router)

//LISTEN

app.listen(process.env.PORT, () => console.log(`Server running in ${process.env.PORT} port`))
