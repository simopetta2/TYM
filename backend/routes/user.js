import express from 'express';
import User from '../models/User.js';
import cloudinaryUploader from '../middleware/cloudinary.js';
import { authentication, isAdmin } from '../middleware/authentication.js';
import { cancell, findAll, findById } from '../controllers/user.js';

const router = express.Router();
// Solo l'admin può vedere la lista completa degli utenti
router.get('/', authentication, isAdmin, findAll);

// Solo l'admin può eliminare un utente specifico tramite ID
router.delete("/:id", authentication, isAdmin, cancell);

// Esempio: Rotta per affidare una scheda (logica da implementare nel controller)
router.patch("/assign-workout/:id", authentication, isAdmin, async (req, res) => {
    // Logica per aggiornare l'utente con una scheda tecnica
});

// Endpoint per ottenere i dati dell'utente loggato
router.get("/me", authentication, async (req, res) => {
    try {
        // Recuperiamo l'utente salvato nel middleware authentication_2.js
        const user = req.authUser;

        if (!user) {
            return res.status(404).json({ message: "Utente non trovato" });
        }

        // Trasformiamo in oggetto per rimuovere dati sensibili
        const userResponse = user.toObject();
        delete userResponse.password;

        res.json(userResponse);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Altre rotte
router.get('/', findAll);
router.get("/:id", findById);

// Rotta Registrazione
router.post("/", cloudinaryUploader.single("avatar"), async (req, res) => {
    try {
        const { name, surname, email, password, birthDate } = req.body;

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
            // Se non c'è un file caricato su Cloudinary, usa l'avatar generato
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