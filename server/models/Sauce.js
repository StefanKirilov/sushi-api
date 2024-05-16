const mongoose = require('mongoose');

const sauceSchema = new mongoose.Schema({
    name: {
        type: String,
        // required: [true, 'Name is required'],
        // minLength: [3, 'Name should be minimum 3 characters long'],
    },
    description: {
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

const Sauce = mongoose.model('Sauce', sauceSchema);

module.exports = Sauce;