const router = require('express').Router();
const sauceService = require('../services/sauceService');

router.get('/',async (req, res) => {
    const sauces = await sauceService.getAll();
    res.json(sauces);
});

router.get('/:sauceId',async (req, res) => {
    const sauceId = req.params.sauceId;
    const sauce = await sauceService.getOne(sauceId);

    res.json(sauce);
});

module.exports = router;