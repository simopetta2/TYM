import express from 'express';
import parser from '../middleware/cloudinary.js';
import Schedule from '../models/Schedule.js';
import { authentication, isAdmin } from '../middleware/authentication.js';




const router = express.Router();


router.get('/', authentication, async (req, res) => {
    try {
        const filter = req.authUser.role === 'admin' ? {} : { user: req.authUser._id };
        const schedules = await Schedule.find(filter).populate('user', 'name surname');
        res.json(schedules);
    } catch (error) {
        res.status(500).json({ message: "Errore recupero eventi" });
    }
});



router.post('/', authentication, isAdmin, parser.single('file'), async (req, res) => {
    try {

        if (!req.file) {
            return res.status(400).json({ message: "File mancante" });
        }
        let type = 'other';
        if (req.file.mimetype.startsWith('image/')) {
            type = 'img';
        } else if (req.file.mimetype.includes('pdf')) {
            type = 'pdf';
        } else if (req.file.mimetype.includes('sheet') || req.file.mimetype.includes('excel')) {
            type = 'excel';
        }
        const newSchedule = new Schedule({
            title: req.body.title,
            date: req.body.date,
            category: req.body.category,
            user: req.body.user,
            fileUrl: req.file.path,
            fileType: type
        });

        await newSchedule.save();
        res.status(201).json(newSchedule);
    } catch (error) {
        res.status(500).json({ message: "Errore durante il caricamento su Cloudinary" });
    }
});




router.put('/:id', authentication, isAdmin, async (req, res) => {
    try {
        const updatedSchedule = await Schedule.findOneAndUpdate(
            { _id: req.params.id, user: req.authUser._id },
            req.body,
            {
                returnDocument: 'after',
            }
        );
        res.json(updatedSchedule);
    } catch (error) {
        res.status(400).json({ message: "Errore aggiornamento" });
    }
});


router.delete('/:id', authentication, isAdmin, async (req, res) => {
    try {
        const deletedSchedule = await Schedule.findByIdAndDelete(req.params.id);
        if (!deletedSchedule) return res.status(404).json({ message: "Scheda non trovata" });
        res.json({ message: "Scheda rimossa" });
    } catch (error) {
        res.status(500).json({ message: "Errore" });
    }
});

export default router;