import cors from 'cors'
import dotenv from 'dotenv'
import express from "express"
import passport from 'passport'
import { connect } from './db.js'
import authRouter from './routes/auth.js'
import googleStrategy from './strategy/googleStrategy.js'
import router from './routes/user.js'
import { cancell } from './controllers/user.js'
import eventRoutes from './routes/calendar.js'
import scheduleRoutes from './routes/schedule.js'

dotenv.config()
connect()
const app = express()


app.use(cors())
app.use(express.json())
app.get('/', (request, response) => {
    response.status(200).json({ message: 'server funzionante' })
})

passport.use(googleStrategy)
app.use('/auth', authRouter)
app.use('/user', router)
app.use('/events', eventRoutes);
app.use('/schedule', scheduleRoutes);



app.listen(process.env.PORT, () => {
    console.log('server in ascolto');

})