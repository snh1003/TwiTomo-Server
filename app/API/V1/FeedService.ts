import express from 'express'
import Feed from "../../entities/Feed";

const router: express.Router = express.Router();


router.post('/', async (req, res) => {
    const { title, name, tag, location, dday, money, peaple, content, photo } = req.body;
    const feed = new Feed()
    await feed.save({

    })
    feed.content = content;
    feed.day = dday;
    feed.name = name;
    feed.location = location;
    feed.Money = money;
    feed.People = peaple;
    feed.
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