const mongoose = require('mongoose');

const drinkSchema = new mongoose.Schema({
    name: {
        type: String,
        // required: [true, 'Name is required'],
        // minLength: [3, 'Name should be minimum 3 characters long'],
    },
    type: {
        type: String,
        // required: [true, 'Description is required'],
    },
    price: {
        type: Number,
        // required: [true, 'Price is required'],
    },
    volume: {
        type: Number,
        // required: [true, 'Weight is required'],
    },
    image: {
        type: String,
        // required: [true, 'Image is required'],
    },
});

const Drink = mongoose.model('Drink', drinkSchema);

module.exports = Drink;