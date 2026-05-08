import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    start: { type: String, required: true },
    description: { type: String, default: "" },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });

const Calendar = mongoose.model('Calendar', eventSchema, "calendar");
export default Calendar;