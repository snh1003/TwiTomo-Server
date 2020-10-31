import express from 'express'
import Feed from "../../entities/Feed";
import {getManager} from "typeorm";
import {upload} from "./fileupload";
import multer from "multer";

const router: express.Router = express.Router();

router.post('/', upload.single('photo'), async (req:express.Request, res:express.Response, next:express.NextFunction) => {
        req.body.photo = req.file.filename



        const feed = getManager().getRepository(Feed)
        const newFeed = feed.create(req.body)
        try {
            await feed.save(newFeed)
            res.send(newFeed)
        }catch(e){
            next({text: e,status: 400})
            return;
        }
    }

);

router.get('/', async (req:express.Request, res:express.Response, next:express.NextFunction) => {
    const feed = getManager().getRepository(Feed)
    const { limit = 10 } = req.query;
    try {
        const FeedAll = await feed.find({take: limit as number})
        res.send(FeedAll)
    }catch (e) {
        next({text:e, status: 400})
    }
})

router.get('/:id', async (req:express.Request, res:express.Response, next:express.NextFunction) => {
    const feed = getManager().getRepository(Feed)
    try {
        const FeedOne = await feed.findOne({where:{id: req.params.id}})
        res.send(FeedOne)
    }catch (e) {
        next({text:e, status: 400})
    }
})

export default router