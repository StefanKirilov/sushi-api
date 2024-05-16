const mongoose = require('mongoose');

const sauceSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
    },
    volume: {
        type: Number,
    },
    image: {
        type: String,
    },
});

const Sauce = mongoose.model('Sauce', sauceSchema);

module.exports = Sauce;