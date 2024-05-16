const mongoose = require('mongoose');

const sushiSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
    },
    count: {
        type: Number,
    },
    weight: {
        type: Number,
    },
    image: {
        type: String,
    },
    likes: [{
        type: mongoose.Types.ObjectId,
        ref: 'User',
    }],
    commentList: [
        {
            user: {
               type: mongoose.Types.ObjectId,
               required: true,
               ref: 'User',
            },
            username: {
                type: String,
             },
            comment: {
                type: String,
            },
            date: {
                type: String,
            },
        }
    ],
});

const Sushi = mongoose.model('Sushi', sushiSchema);

module.exports = Sushi;