import express from "express";
import cors from 'cors';
import router from "../routes/user.js";





export class Server {



    constructor() {
        this.app = express();
        this.port = process.env.PORT
        this.userPath = '/api/users'
        //middlewares
        this.middlewares();

        //app routes
        this.routes();
    }

    middlewares() {
        //cors
        this.app.use(cors())
        //public directorie
        this.app.use(express.static('public'))
    }

    routes() {

        this.app.use(this.userPath, router)
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Example app listening on port ${this.port}`)
        })


    }
}
