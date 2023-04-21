export async function authorization() {
    const token = req.headers.authorization?.replace('Bearer ', '')
    if(!token) return resizeBy.sendStatus(401)
}