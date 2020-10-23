const mongoose = require('mongoose');

const PortfolioSchema = new mongoose.Schema({
    name: {
        type: String,
        min: 6,
        max: 30,
        required: true
    },
    title: {
        type: String,
        min: 6,
        max: 30,
        required: true
    }
});

module.exports = mongoose.model('Portfolio', PortfolioSchema);