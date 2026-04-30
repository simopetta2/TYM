import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import dotenv from 'dotenv';
import User from '../models/User.js';

dotenv.config();

const googleStrategy = new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
}, async (accessToken, refreshToken, profile, done) => {
    try {
        const { emails, name, photos } = profile;
        const email = emails[0].value;


        let user = await User.findOne({ email });


        if (!user) {
            user = new User({
                name: name.givenName,
                surname: name.familyName,
                email: email,
                avatar: photos[0].value,
            });
            await user.save();
        }


        done(null, user);
    } catch (error) {
        done(error, null);
    }
});

export default googleStrategy;