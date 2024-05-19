import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Router } from 'express';

const routes = Router();

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_CLIENT_CALLBACK_URL
        },
        (_accessToken, _refreshToken, profile, done) => {
            done(null, profile._json);
        }
    )
);

routes.get(
    '/google',
    passport.authenticate('google', {
        scope: ['profile', 'email', 'https://www.googleapis.com/auth/user.birthday.read']
    })
);

routes.get(
    '/google/callback',
    passport.authenticate('google', {
        session: false
    }),
    () => {}
);

export default routes;
