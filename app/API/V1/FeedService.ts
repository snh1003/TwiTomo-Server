import express from 'express'
import Feed from "../../entities/Feed";
import {getManager} from "typeorm";

const router: express.Router = express.Router();
// @ts-ignore
// const wrap = fn => (...args) => fn(...args).catch(e => args[2]({err: e,status :400}))
const wrap = fn => (...args) => fn(...args)

router.post('/',async (req:express.Request, res:express.Response, next:express.NextFunction) => {
    const feed = getManager().getRepository(Feed)
    const newFeed = feed.create(req.body)
    try {
        await feed.save(newFeed)
    }catch(e){
    next({text: e,status: 400})
        return;
    }

    res.send(newFeed)
});

router.get('/', async (req, res) => {
    console.log('hahahaha')
    const feeds = await Feed.find()
})

export default router