const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
app.use(cookieParser());
app.use(express.json());
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
  }

mongoose.connect('mongodb://localhost:27017/portfolio', { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('successfully connected to mongodb');
});

const userRouter = require('./routes/User');
app.use('/user', userRouter)

const port = process.env.PORT || 5001;
app.listen(port, () => {
    console.log(`Backend started on port ${port}`)
})
