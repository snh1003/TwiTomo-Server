import multer from "multer"
import moment from "moment"


const storage = multer.diskStorage({
    destination: function(req, file:Express.Multer.File, cb: (error: Error | null, destination: string) => void) {
        cb(null, 'uploads');
    },
    filename: function(req, file:Express.Multer.File, cb: (error: Error | null, filename: string) => void) {
        cb(null, moment().format('YYYYMMDDHHmmss') + "_" + file.originalname);
    }
});

export const upload = multer({ storage: storage }).single("file");