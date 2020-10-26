import express from 'express'
import Feed from "../../entities/Feed";
import {getManager} from "typeorm";
import {upload} from "./fileupload";
import multer from "multer";

const router: express.Router = express.Router();

router.post('/', upload.single('photo'), async (req:express.Request, res:express.Response, next:express.NextFunction) => {
        req.body.photo = req.file.filename
        console.log('원본파일명 : ' + req.file.originalname)
        console.log('저장파일명 : ' + req.file.filename)
        console.log('크기 : ' + req.file.size)
        console.log('haha' + req.body.photo)

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
    try {
        const FeedAll = await feed.find()
        res.send(FeedAll)
    }catch (e) {
        next({text:e, status: 400})
    }

})

export default router