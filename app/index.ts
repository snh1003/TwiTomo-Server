import express from 'express'
import {BaseEntity, Connection, createConnection} from "typeorm";
import Feed from "./API/V1/FeedService"


createConnection()
    .then(async (connection: Connection) =>
        console.log("Entity connected : ", connection.isConnected)
    )
    .catch((err: Error) => console.log("Entity connection error : ", err));

const app: express.Express = express()

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
})
app.listen(3001,()=>{ console.log('Example app listening on port 3000!') })
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/', Feed)

