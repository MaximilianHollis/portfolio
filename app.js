const express = requrie('express');
const app = express();
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
app.use(cookieParser);
app.use(express.json());

app.use(function (req, res, next) {
    // Frontend Origin
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');

    // Allow cookies
    res.setHeader('Access-Control-Allow-Credentials', true);

    next();

});

mongoose.connect('mongodb://localhost:27017/portfolio', { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('successfully connected to mongodb');
});

const userRouter = require('./routers/User');
app.use('/user', userRouter)

app.listen(5000, () => {
    console.log('Backend started on port 5000')
})