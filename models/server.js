import express from "express";
import cors from "cors";
import userRouter from "../routes/users.js";
import { dbConnection } from "../dataBase/config.js";
import router from "../routes/auth.js";
import categoriesRouter from "../routes/categories.js";
import productsRouter from "../routes/products.js";
import searchingRouter from "../routes/searching.js";
import uploadRouter from "../routes/upload.js";

export class Server {

  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.userPath = "/api/users";
    this.authPath = "/api/auth";
    this.categoriesPath = "/api/categories";
    this.productsPath = "/api/products";
    this.searchingPath = "/api/searching";
    this.uploadPath = "/api/uploads";

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
    this.app.use(this.categoriesPath, categoriesRouter);
    this.app.use(this.productsPath, productsRouter);
    this.app.use(this.searchingPath, searchingRouter);
    this.app.use(this.uploadPath, uploadRouter);
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
