const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    owner: {
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
    likes: [{
        type: mongoose.Types.ObjectId,
        ref: 'User',
    }],

});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;