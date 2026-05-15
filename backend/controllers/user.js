import mongoose from 'mongoose'
import User from '../models/User.js'



export async function update(req, res) {
    try {

        const id = req.params.id || (req.authUser ? req.authUser._id : null);

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid user id' });
        }

        const { name, surname, email, birthDate, avatar, bio, weight, height } = req.body;


        const updatedUser = await User.findByIdAndUpdate(
            id,
            { name, surname, email, birthDate, avatar, bio, weight, height },
            {
                returnDocument: 'after',
                runValidators: true
            }
        ).select("-password");

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(updatedUser);

    } catch (error) {

        if (error.code === 11000) {
            return res.status(400).json({ message: 'Email già in uso.' });
        }

        res.status(500).json({ message: error.message });
    }
}
export async function cancell(req, res) {
    try {
        const { id } = req.params
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: 'invalid user id'
            })
        }
        const deleteUser = await User.findByIdAndDelete(id)
        if (!deleteUser) {
            return res.status(404).json({
                message: 'User not found'
            })
        }
        res.status(200).json({
            message: 'User deleted'

        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}


export async function findAll(req, res) {
    try {
        const { page, limit } = req.query
        const usersQuery = User.find()
        if (page && limit) {
            usersQuery.skip((page - 1) * limit).limit(limit)
        }
        const users = await usersQuery
        res.status(200).json(users)
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

export async function findById(req, res) {
    try {
        const { id } = req.params
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: 'invalid user id'
            })
        }
        const user = await User.findById(req.params.id)
        if (!user) {
            return res.status(404).json({
                message: 'user not found'
            })
        }
        res.status(200).json(user)
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}