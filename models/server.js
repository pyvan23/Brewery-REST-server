import express from "express";

export class Server {


    
    constructor() {
        this.app = express();
        this.port = process.env.PORT

        this.routes();
    }

    routes() {
        this.app.get("/", (req, res) => {
            res.send("home page");
        });
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`Example app listening on port ${this.port}`)
        })
        
        
    }
}
