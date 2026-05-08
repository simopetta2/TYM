import Calendar from '../models/Calendar.js';


export const getAllEvents = async (req, res) => {

    try {
        const events = await Calendar.find({ user: req.authUser._id });
        res.json(events);
    } catch (error) {
        res.status(500).json({ message: "Errore recupero eventi" });
    }
};

export const createEvent = async (req, res) => {


    try {
        const newEvent = new Calendar({
            ...req.body,
            user: req.authUser._id
        });
        await newEvent.save();
        res.status(201).json(newEvent);
    } catch (error) {
        res.status(400).json({ message: "Errore creazione" });
    }


};

export const deleteEvent = async (req, res) => {
    try {
        await Calendar.findOneAndDelete({ _id: req.params.id, user: req.authUser._id });
        res.json({ message: "Eliminato" });
    } catch (error) {
        res.status(500).json({ message: "Errore eliminazione" });
    }
};