import express from 'express'
import cors from 'cors'
import { MongoClient } from 'mongodb'
import dotenv from 'dotenv'
import {v4 as uuid} from 'uuid'
import bcrypt from 'bcrypt'
import Joi from 'joi'

//CONFIG
const app = express()
app.use(cors())
app.use(express.json())
dotenv.config()

//DB CONNECTION
const mongoClient = new MongoClient(process.env.DATABASE_URL)
try {
    await mongoClient.connect()
    console.log('MongoDB Connected')
}catch(err) {
    console.log(err.message)
}
const db = mongoClient.db()

//SCHEMAS

//roots
app.post("/cadastro", async(req, res) => {
    const {email, password} = req.body

})

//LISTEN
const PORT = 5000
app.listen(PORT, () => console.log('Server running in 5000 port'))
