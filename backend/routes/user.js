import express from 'express';
import User from '../models/User.js';
import cloudinaryUploader from '../middleware/cloudinary.js';
import { authentication } from '../middleware/authentication.js';
import { cancell, findAll, findById } from '../controllers/user.js';

const router = express.Router();
router.get('/', findAll)
router.get("/:id", findById)
router.delete("/:id", authentication, cancell);
router.post("/", cloudinaryUploader.single("avatar"), async (req, res) => {
    try {

        const { name, surname, email, password, birthDate, avatar } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "Dati obbligatori mancanti" });
        }

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "Email già registrata" });
        }

        const newUser = new User({
            name,
            surname,
            email,
            password,
            birthDate,
            avatar: req.file ? req.file.path : `https://ui-avatars.com/api/?name=${name}+${surname}`
        });

        await newUser.save();

        const userResponse = newUser.toObject();
        delete userResponse.password;

        res.status(201).json(userResponse);
    } catch (error) {
        console.error("Errore registrazione:", error);
        res.status(500).json({ message: "Errore interno del server" });
    }
});

export default router;


