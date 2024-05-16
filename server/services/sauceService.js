const Sauce = require('../models/Sauce');

exports.getAll = () => Sauce.find();

exports.getOne = (sauceId) => Sauce.findById(sauceId);
