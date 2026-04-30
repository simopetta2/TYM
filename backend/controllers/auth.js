import User from '../models/User.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export async function login(req, res) {
    try {
        const { email, password } = req.body
        let user = await User.findOne({ email })
        if (!user) {
            return res.status(401).send({ message: 'Wrong credentials' })
        }

        const result = await bcrypt.compare(password, user.password)
        if (!result) {
            return res.status(401).send({ message: 'Wrong credentials' })
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
        res.json({ token })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}



export const googleCallback = async (req, res) => {
    try {

        const payload = { id: req.user._id };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' });


        res.redirect(`http://localhost:5173/login?token=${token}`);
    } catch (error) {
        console.error("Errore nel Google Callback:", error);

        res.redirect('http://localhost:5173/login?error=auth_failed');
    }
};