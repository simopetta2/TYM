import express from 'express';
import Calendar from '../models/Calendar.js';
import { authentication, isAdmin } from '../middleware/authentication.js';

const router = express.Router();


router.get('/', authentication, async (req, res) => {
    try {
        const filter = req.authUser.role === 'admin' ? {} : { user: req.authUser._id };
        const events = await Calendar.find(filter).populate('user', 'name surname');
        res.json(events);
    } catch (error) {
        res.status(500).json({ message: "Errore recupero eventi" });
    }
});

router.post('/', authentication, async (req, res) => {
    try {
        const newEvent = new Calendar({
            ...req.body,

            user: req.authUser.role === 'admin' ? req.body.user : req.authUser._id
        });
        await newEvent.save();
        res.status(201).json(newEvent);
    } catch (error) {
        res.status(400).json({ message: "Errore creazione" });
    }
});

router.delete('/:id', authentication, isAdmin, async (req, res) => {
    try {
        const deletedEvent = await Calendar.findByIdAndDelete(req.params.id);
        if (!deletedEvent) return res.status(404).json({ message: "Evento non trovato" });
        res.message({ message: "Evento eliminato correttamente" });
    } catch (error) {
        res.status(500).json({ message: "Errore" });
    }
});


router.put('/:id', authentication, isAdmin, async (req, res) => {
    try {
        const updatedEvent = await Calendar.findOneAndUpdate(
            { _id: req.params.id, user: req.authUser._id },
            req.body,
            { returnDocument: 'after' }
        );
        res.json(updatedEvent);
    } catch (error) {
        res.status(400).json({ message: "Errore aggiornamento" });
    }
});
router.patch('/:id', authentication, async (req, res) => {
    try {
        const updateData = { ...req.body };

        if (req.authUser.role !== 'admin') delete updateData.user;

        const updated = await Calendar.findOneAndUpdate(
            { _id: req.params.id, ...(req.authUser.role !== 'admin' && { user: req.authUser._id }) },
            updateData,
            {
                returnDocument: 'after'
            }
        );
        res.json(updated);
    } catch (error) {
        res.status(400).json({ message: "Errore aggiornamento" });
    }
});


export default router;