const Comment = require('../models/Comment');
const User = require('../models/User');

exports.getAll = () => Comment.find();

exports.create = (commentData) => Comment.create(commentData);

exports.getOne = (commentId) => Comment.findById(commentId);

exports.update = (commentId,commentData) => Comment.findByIdAndUpdate(commentId,commentData);

exports.delete = (commentId) => Comment.findByIdAndDelete(commentId);

exports.like = async (commentId, userId) =>{
    const comment = await Comment.findById(commentId);

    comment.likes.push(userId);

    await comment.save();

    return;
};

exports.unlike = async (commentId, userId) =>{
    const comment = await Comment.findById(commentId);

    comment.likes.pull(userId);

    await comment.save();

    return;
};
