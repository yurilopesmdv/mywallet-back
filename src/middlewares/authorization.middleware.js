import { db } from "../database/database.connection.js"

export async function authValidation(req, res, next) {
    const token = req.headers.authorization?.replace('Bearer ', '')
    if(!token) return res.status(401).send('token')
    console.log(req.headers)
    try {
        const session = await db.collection("sessions").findOne({token})
        if(!session) return res.status(401).send('sessao')
        const user = await db.collection("users").findOne({
            _id: session.userId
        })
        res.locals.session = session
        res.locals.user = user
        next()
    } catch (err) {
        return res.status(500).send(err.message)
    }
}