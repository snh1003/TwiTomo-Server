import express from 'express'
import Feed from "../../entities/Feed";
import {getManager} from "typeorm";

const router: express.Router = express.Router();

router.post('/',async (req:express.Request, res:express.Response, next:express.NextFunction) => {
    const feed = getManager().getRepository(Feed)
    const newFeed = feed.create(req.body)
    try {
        await feed.save(newFeed)
        res.send(newFeed)
    }catch(e){
        next({text: e,status: 400})
        return;
    }
});

router.get('/', async (req:express.Request, res:express.Response, next:express.NextFunction) => {
    const feed = getManager().getRepository(Feed)
    try {
        const FeedAll = await feed.find()
        res.send(FeedAll)
    }catch (e) {
        next({text:e, status: 400})
    }

})

export default router