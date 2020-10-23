const mongoose = require('mongoose');

const PortfolioSchema = new mongoose.Schema({
    name: {
        type: String,
        max: 30,
        required: true
    },
    title: {
        type: String,
        max: 30,
        required: true
    }
});

module.exports = mongoose.model('Portfolio', PortfolioSchema);