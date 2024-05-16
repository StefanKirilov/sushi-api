const mongoose = require('mongoose');

const sushiSchema = new mongoose.Schema({
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
    count: {
        type: Number,
        // required: [true, 'Count is required'],
    },
    weight: {
        type: Number,
        // required: [true, 'Weight is required'],
    },
    image: {
        type: String,
        // required: [true, 'Image is required'],
    },
    likes: [{
        type: mongoose.Types.ObjectId,
        ref: 'User',
    }],
    // owner: {
    //     type: mongoose.Types.ObjectId,
    //     ref: 'User',
    // },
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
                // required: [true, 'Comment is required'],
            },
            date: {
                type: String,
            },
        }
    ],
});

const Sushi = mongoose.model('Sushi', sushiSchema);

module.exports = Sushi;