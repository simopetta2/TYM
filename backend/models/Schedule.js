import mongoose from 'mongoose';

const scheduleSchema = new mongoose.Schema({
    title: { type: String, required: true },
    date: { type: String, required: true },
    category: { type: String, required: true },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    fileUrl: { type: String, required: true },
    fileType: {
        type: String,
        required: true,
        enum: ['img', 'excel', 'other'],
        default: 'other'
    },

}, { timestamps: true });

const Schedule = mongoose.model('Schedule', scheduleSchema);
export default Schedule;