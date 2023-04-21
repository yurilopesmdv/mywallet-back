import bcrypt from 'bcrypt'
import { db } from '../app.js'
import { signupSchema } from '../schemas/sign.schema.js'

export async function signup(req, res) {
    const {name, email, password} = req.body
    const validBody = signupSchema.validate({
        name,
        email,
        password
    })
    
    if(validBody.error) return res.sendStatus(422)
    const userExists = await db.collection("users").findOne({email: email})
    if(userExists) return res.sendStatus(409)
    const hash = bcrypt.hashSync(password, 10)
    try {
        await db.collection("users").insertOne({
            name,
            email,
            password: hash
        })
        return res.send(201)
    } catch(error) {
        res.status(500).send(error.message)
    }
}
export async function signin(req, res) {
    
}