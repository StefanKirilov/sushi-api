const Drink = require('../models/Drink');

exports.getAll = () => Drink.find();

exports.getOne = (drinkId) => Drink.findById(drinkId);

