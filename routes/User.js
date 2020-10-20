const express = require('express');
const userRouter = express.Router();
const passport = require('passport');
const passportConfig = require('../passport');
const JWT = require('jsonwebtoken');
const User = require('../models/User');
var cors = require('cors')

userRouter.use(cors({
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 // being nice to old browsers :)
}));

//enabling preflight for all requests
userRouter.options('*', cors());

userRouter.post('/register', (req, res) => {
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

userRouter.post('/login', passport.authenticate('local', { session: false }), (req, res) => {
    if (req.isAuthenticated()) {
        const { _id, username, role } = req.user;
        const token = signToken(_id);
        //for prod, make the cookies secure, and change the domain OR ELSE!!!!!
        //res.cookie('access_token',token,{secure: false, sameSite: 'strict', path:'/'}); 
        //convert to nextjs api routes :)
        res.setHeader('set-cookie', `access_token=${token}`)
        res.status(200).json({ isAuthenticated: true, user: { username, role } });
    }
});

userRouter.get('/logout', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.setHeader('set-cookie', `access_token=null`)
    res.json({ user: { username: "", role: "" }, success: true });
});

module.exports = userRouter