import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config()

export async function connect() {
    if (!process.env.MONGODB_URI) {
        console.error('CRITICO: MONGODB_URI non è definita nelle variabili d\'ambiente.')
        process.exit(1)
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log('Connessione al database riuscita')
    } catch (err) {
        console.error('Errore nella connessione al database:', err)
        process.exit(1)
    }
}