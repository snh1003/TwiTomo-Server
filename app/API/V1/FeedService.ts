import express from 'express'
import Feed from "../../entities/Feed";
import {getManager} from "typeorm";
import {upload} from "./fileupload";
import multer from "multer";

const router: express.Router = express.Router();

router.post('/', (req:express.Request, res:express.Response, next:express.NextFunction) => {
    upload(req, res, async (err: any) => {
        if (err instanceof multer.MulterError) {
            return ({text: err + "multerError",status: 400})
        } else if (err) {
            return ({text: err,status: 400});
        }
        console.log(req.body)
        const feed = getManager().getRepository(Feed)
        const newFeed = feed.create(req.body)
        try {
            await feed.save(newFeed)
            res.send(newFeed)
        }catch(e){
            next({text: e,status: 400})
            return;
        }
        console.log('원본파일명 : ' + req.file.originalname)
        console.log('저장파일명 : ' + req.file.filename)
        console.log('크기 : ' + req.file.size)
    })

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