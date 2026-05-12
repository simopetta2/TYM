import jwt from 'jsonwebtoken'
import User from '../models/User.js'



export async function authentication(req, res, next) {
    const token = req.headers.authorization
    if (!token) return res.status(401).send()
    const parts = token.split(' ')
    const jwtToken = parts[1]
    jwt.verify(jwtToken, process.env.JWT_SECRET, async (err, payload) => {
        if (err) return res.status(401).send()
        const user = await User.findById(payload.id)
        if (!user) return res.status(401).send()
        req.authUser = user
        next()
    })

}


export const isAdmin = (req, res, next) => {

    if (req.authUser && req.authUser.role === 'admin') {
        next();
    } else {
        res.status(403).json({ message: "Accesso negato: richiesti permessi di amministratore" });
    }
};