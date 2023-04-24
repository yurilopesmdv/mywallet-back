import { db } from '../database/database.connection.js'
import dayjs from 'dayjs'

export async function addTransaction(req, res) {
    const { description, value, type } = req.body
    const { session, user } = res.locals
    try {
        db.collection("transactions").insertOne({
            description,
            value: Number(value.toFixed(2)),
            type,
            userId: session.userId,
            date: dayjs().format("DD/MM")
        })
        return res.sendStatus(201)
    } catch (err) {
        res.status(500).send(err.message)
    }
}
export async function listTransaction(req, res) {
    const { user } = res.locals
    try {
        const list = await db.collection("transactions").find({ userId: user._id }).toArray()
        let saldo = 0
        for (let i = 0; i < list.length; i++) {
            const t = list[i]
            if (t.value) {
                if (t.type === 'entrada') {
                    saldo += t.value
                } else {
                    saldo -= t.value
                }
            }
        }
        list.push({saldo: saldo.toFixed(2)})
        return res.status(200).send(list)
    } catch (err) {
        res.status(500).send(err.message)
    }
}