import bcrypt from 'bcrypt'
import { db } from '../app.js'
import { signinSchema, signupSchema } from '../schemas/sign.schema.js'
import { v4 as uuid } from 'uuid'

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
    const {email, password} = req.body
    const validBody = signinSchema.validate({
        email,
        password
    })
    if(validBody.error) return res.sendStatus(422)
    try {
        const user = await db.collection("users").findOne({email: email})
        if(!user) return res.sendStatus(404)
        const validPassword = bcrypt.compareSync(password, user.password)
        if(!validPassword) return res.sendStatus(401)
        const token = uuid()
        db.collection("sessions").insertOne({
            id: user._id,
            token
        })
        return res.status(200).send(token)
    } catch(error) {
        res.status(500).send(error.message)
    }
}