import dotenv from 'dotenv'
import mongoose from 'mongoose'


dotenv.config()

export async function connect() {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log('connesso al database db')
    }
    catch (err) {
        console.log('errore nella connessione al database db', err)
    }
}