import mongoose from "mongoose";
import bcrypt from 'bcrypt';

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    birthDate: { type: String },
    avatar: { type: String },
    password: { type: String, required: false },
    googleId: { type: String },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    bio: {
        type: String,
        trim: true,
        maxLength: 500,
        default: ""
    },
    weight: { type: Number, default: null },
    height: { type: Number, default: null }
});


UserSchema.pre('save', async function () {

    if (!this.password || !this.isModified('password')) {
        return;
    }

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);

    } catch (error) {
        throw error;
    }
});

const User = mongoose.model('User', UserSchema, 'user');
export default User;