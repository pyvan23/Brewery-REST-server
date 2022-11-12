import express from "express";
import cors from "cors";
import router from "../routes/users.js";
import { dbConnection } from "../dataBase/config.js";

export class Server {

  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.userPath = "/api/users";
    
    //Db connection
    this.dBConnection();

    //middlewares
    this.middlewares();

    //app routes
    this.routes();
  }

  middlewares() {
    //cors
    this.app.use(cors());
    //read and parse of body to json
    this.app.use(express.json());
    //public directorie
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.userPath, router);
  }

  async dBConnection() {
    await dbConnection();
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Example app listening on port ${this.port}`);
    });
  }
}
