import express from 'express'
import Feed from "../../entities/Feed";

const router: express.Router = express.Router();
const feed = new Feed()

router.post('/', async (req, res) => {
            const { title, name, tag, location, dday, money, peaple, content, photo } = req.body;

            const feeds = await Feed.(req.params.id);
            if (feeds) {
                res.status(200).json(feeds.comment);
            } else {
                res.status(404).json({error: 'BadRequest'});
            }
});

router.get('/', async (req, res) => {
    const feeds = await Feed.find()
})

export default router