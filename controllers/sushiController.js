const router = require('express').Router();
const sushiService = require('../services/sushiService');

router.get('/',async (req, res) => {
    const sushi = await sushiService.getAll();
    res.json(sushi);
});

router.get('/:sushiId',async (req, res) => {
    const sushiId = req.params.sushiId;
    const sushi = await sushiService.getOne(sushiId);

    res.json(sushi);
});

router.get('/:sushiId/like', async (req, res) => {
    const user = JSON.parse(req.cookies["auth"]);

    const sushiId = req.params.sushiId;
    const userId = user?._id;


    try {
        await sushiService.like(sushiId, userId);
        res.status(204).json({ok: true});
    } catch (error) {
        console.log(error.message);
    }
});

router.get('/:sushiId/unlike', async (req, res) => {
    const user = JSON.parse(req.cookies["auth"]);

    const sushiId = req.params.sushiId;
    const userId = user?._id;

    try {
        await sushiService.unlike(sushiId, userId);
        res.status(204).json({ok: true});
    } catch (error) {
        console.log(error.message);
    }
});

router.post('/:sushiId/comments', async (req, res) => {
    const sushiId = req.params.sushiId;
    const { comment, username } = req.body;
    const user = req.cookies["auth"]?._id;
    const date = new Date().toISOString();

    try {
        await sushiService.addComment(sushiId, { user , comment, username, date});
        res.status(204).json({ok: true});
    } catch (error) {
        console.log(error.message);
    }
});

router.post('/:sushiId/deleteComment', async (req, res) => {

    const sushiId = req.params.sushiId;
    const { elementId } = req.body;
    try {
        await sushiService.deleteComment(sushiId, elementId);
        res.status(204).json({ok: true});
    } catch (error) {
        console.log(error.message);
    }
});



module.exports = router;