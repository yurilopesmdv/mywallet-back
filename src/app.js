import express from 'express'
import cors from 'cors'
import { MongoClient } from 'mongodb'
import dotenv from 'dotenv'
import router from './routes/index.routes.js'

//CONFIG
const app = express()
app.use(cors())
app.use(express.json())
app.use(router)
dotenv.config()

//DB CONNECTION
const mongoClient = new MongoClient(process.env.DATABASE_URL)
try {
    await mongoClient.connect()
    console.log('MongoDB Connected')
}catch(err) {
    console.log(err.message)
}
export const db = mongoClient.db()

//LISTEN
const PORT = 5000
app.listen(PORT, () => console.log('Server running in 5000 port'))
