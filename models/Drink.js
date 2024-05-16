const mongoose = require('mongoose');

const drinkSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    type: {
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

const Drink = mongoose.model('Drink', drinkSchema);

module.exports = Drink;