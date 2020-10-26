import express from 'express'
import {Connection, createConnection} from "typeorm";
import Feed from "./API/V1/FeedService"


createConnection()
    .then(async (connection: Connection) =>
        console.log("Entity connected : ", connection.isConnected)
    )
    .catch((err: Error) => console.log("Entity connection error : ", err));

const app: express.Express = express()

const logErrors = (err:{text:string,status:number}, req:express.Request, res:express.Response, next:express.NextFunction) => {
    console.error(err.status + 'stack');
    next(err);
}

const errorHandler = (err:{text:string,status:number}, req:express.Request, res:express.Response, next:express.NextFunction) => {
    res.status( err.status || 500);
    res.send({ error: err.text });
}


app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next()
})

app.listen(4000,()=>{ console.log('Example app listening on port 4000!') })
app.use(express.json())
app.use(express.static('uploads'));
app.use(express.urlencoded({ extended: true }))
app.use('/', Feed)
app.use(logErrors);
app.use(errorHandler);

