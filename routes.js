const router = require('express').Router();

const userController = require('./controllers/userController');
const sushiController = require('./controllers/sushiController');
const drinkController = require('./controllers/drinkController');
const sauceController = require('./controllers/sauceController');
const commentController = require('./controllers/commentController');

router.use('/users', userController);
router.use('/sushi', sushiController);
router.use('/drinks', drinkController);
router.use('/sauce', sauceController);
router.use('/comments', commentController);

module.exports = router;