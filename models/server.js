import express from "express";
import cors from "cors";
import userRouter from "../routes/users.js";
import { dbConnection } from "../dataBase/config.js";
import router from "../routes/auth.js";

export class Server {

  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.userPath = "/api/users";
    this.authPath = "/api/auth";

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
    this.app.use(this.authPath, router);
    this.app.use(this.userPath, userRouter);
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
