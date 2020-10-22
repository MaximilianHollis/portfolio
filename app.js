const express = require('express');
const app = express();
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
  }
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
var cors = require('cors')

app.use(cors())

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

const userRouter = require('./routes/User.js');
app.use('/user', userRouter)

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Backend started on port ${port}`)
})
