const Sushi = require('../models/Sushi');
const User = require('../models/User');

exports.getAll = () => Sushi.find();

// exports.create = (bookingData) => Booking.create(bookingData);

exports.getOne = (sushiId) => Sushi.findById(sushiId);

// exports.update = (bookingId,bookingData) => Booking.findByIdAndUpdate(bookingId,bookingData);

// exports.delete = (sushiId) => Sushi.findByIdAndDelete(sushiId);

exports.like = async (sushiId, userId) =>{
    const sushi = await Sushi.findById(sushiId);
    // const user = await User.findById(userId);

    sushi.likes.push(userId);
    // user.likedHouses.push(bookingId);

    await sushi.save();
    // await user.save();

    return;
};

exports.unlike = async (sushiId, userId) =>{
    const sushi = await Sushi.findById(sushiId);
    // const user = await User.findById(userId);

    sushi.likes.pull(userId);
    // user.likedHouses.pull(bookingId);

    await sushi.save();
    // await user.save();

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
