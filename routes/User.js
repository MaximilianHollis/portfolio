const express = require('express');
const userRouter = express.Router();
const passport = require('passport');
const passportConfig = require('../passport');
const JWT = require('jsonwebtoken');
const User = require('../models/User');
var cors = require('cors')

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const corsOptions = {
    credentials: true,
    origin: 'http://localhost:5001'
}

userRouter.use(cors(corsOptions));

const signToken = userID => {
    return JWT.sign({
        iss: "Portfolio",
        sub: userID
    }, process.env.SECRET, {expiresIn: "1h"});
}

userRouter.post('/register', cors(), (req, res) => {
    const { username, password, role } = req.body;
    User.findOne({ username }, (err, user) => {
        if (err) {
            res.status(500).json({ message: { msgBody: "Error has occured", msgError: true } });
        }
        if (user) {
            res.status(400).json({ message: { msgBody: "Username is already taken", msgError: true } });
        }
        else {
            const newUser = new User({ username, password, role });
            newUser.save(err => {
                if (err)
                    res.status(500).json({ message: { msgBody: "Error has occured", msgError: true } });
                else
                    res.status(201).json({ message: { msgBody: "Account successfully registered", msgError: false } });
            });
        }
    });
});

userRouter.post('/login', cors(), passport.authenticate('local', { session: false }), (req, res) => {
    if (req.isAuthenticated()) {
        const { _id, username, role } = req.user;
        const token = signToken(_id);
        //hello token aka dan :D
        res.cookie('access_token', token, {
            httpOnly: true
        })
        res.status(200).json({ isAuthenticated: true, user: { username, role } });
    }
});

userRouter.get('/logout', cors(), passport.authenticate('jwt', { session: false }), (req, res) => {
    res.clearCookie('access_token');
    res.json({ user: { username: "", role: "" }, success: true });
});

userRouter.get('/authenticated', cors(), passport.authenticate('jwt', { session: false }), (req, res) => {
    const { username, role } = req.user;
    res.status(200).json({ isAuthenticated: true, user: { username, role } });
});

module.exports = userRouter;