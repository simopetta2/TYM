import jwt from 'jsonwebtoken'
import User from '../models/User.js'



export async function authentication(req, res, next) {
    const token = req.headers.authorization
    if (!token) return res.status(401).send()
    const parts = token.split(' ')
    const jwtToken = parts[1]
    jwt.verify(jwtToken, process.env.JWT_SECRET, async (err, payload) => {
        if (err) return res.status(401).send()
        const author = await User.findById(payload.id)
        if (!author) return res.status(401).send()
        req.authUser = author
        next()
    })

}