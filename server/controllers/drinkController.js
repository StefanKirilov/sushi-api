const router = require('express').Router();
const drinkService = require('../services/drinkService');

router.get('/',async (req, res) => {
    const drinks = await drinkService.getAll();
    res.json(drinks);
});

router.get('/:drinkId',async (req, res) => {
    const drinkId = req.params.drinkId;
    const drink = await drinkService.getOne(drinkId);

    res.json(drink);
});

module.exports = router;