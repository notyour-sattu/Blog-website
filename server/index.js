import express from "express";
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from "body-parser";
import session from "express-session";
import passport from "passport";
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import jwt from 'jsonwebtoken';
import Connection from "./database/db.js";
import Router from "./routes/route.js";
import User from "./model/user.js";
import Token from './model/token.js';


dotenv.config();
const app = express();
app.use(cors({
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
    origin: ['http://localhost:3000'] // Your frontend URL
    
}));
app.use(bodyParser.json({ extended: true }))
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/', Router);

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))
app.use(passport.initialize());
app.use(passport.session());



const PORT = 8000;
const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;
const CLIENTID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

Connection(USERNAME, PASSWORD);
passport.use(
    new GoogleStrategy({
        clientID: CLIENTID,
        clientSecret: CLIENT_SECRET, 
        callbackURL: '/auth/google/callback',
        scope: ["profile", "email"]
    },
        async (accessToken, refreshToken, profile, done) => {
            try {
    
                let user = await User.findOne({ email: profile.emails[0].value  });
               
                if (!user) {
                   
                    user = new User({
                        email: profile.emails[0].value,
                        username: profile.displayName,
                        password: '',
                        googleId: profile.id
                    });
                    await user.save();       
                }

                accessToken= jwt.sign(user.toJSON(), process.env.ACCESS_SECRET_KEY, {expiresIn: '15m' });
                refreshToken=jwt.sign(user.toJSON(), process.env.REFRESH_SECRET_KEY);
                const newToken = new Token({token: refreshToken})
                await newToken.save();                
                console.log( {
                    accessToken: accessToken,
                    refreshToken: refreshToken,
                    user: {
                        username: user.username,
                        email: user.email,
                        password: user.password,
                        googleId: user.googleId
                        // Add other user information as needed
                    }
                });
                return done(null, {
                    accessToken: accessToken,
                    refreshToken: refreshToken,
                    user: {
                        username: user.username,
                        email: user.email,
                        password: user.password,
                        googleId: user.googleId
                        // Add other user information as needed
                    }
                });
                
            } catch (error) {
                console.error(error);
                return done(error, null)
            }
        })
)

passport.serializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser((user, done) => {
    try{
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});


app.get("/auth/google", passport.authenticate("google",
        {
            scope: ["profile", "email"],
            prompt: 'select_account'

        })
);

app.get("/auth/google/callback", passport.authenticate("google", {

    successRedirect: "http://localhost:3000/",
    failureRedirect: "http://localhost:3000/login"
}));



app.listen(PORT, () => console.log(`Server is running successfully on PORT ${PORT}`));




//dBbloG - blogDB