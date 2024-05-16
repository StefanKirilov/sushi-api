const Sushi = require('../models/Sushi');
const User = require('../models/User');

exports.getAll = () => Sushi.find();

exports.getOne = (sushiId) => Sushi.findById(sushiId);

exports.like = async (sushiId, userId) =>{
    const sushi = await Sushi.findById(sushiId);

    sushi.likes.push(userId);

    await sushi.save();

    return;
};

exports.unlike = async (sushiId, userId) =>{
    const sushi = await Sushi.findById(sushiId);

    sushi.likes.pull(userId);

    await sushi.save();

    return;
};

exports.addComment = async (sushiId, commentData) =>{
    const sushi = await Sushi.findById(sushiId);
    sushi.commentList.push(commentData);
    await sushi.save();

    return sushi;
};


exports.deleteComment = async (sushiId, commentId) =>{
    const sushi = await Sushi.findById(sushiId);
    const comment = sushi.commentList.filter(x => x._id.toString() === commentId)[0];
    
    sushi.commentList.pull(comment);
    await sushi.save();

    return sushi;
};
