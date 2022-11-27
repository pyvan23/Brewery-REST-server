import { Router } from "express";
import { searching } from "../controllers/searching.js";

const searchingRouter = Router();



searchingRouter.get('/:collection/:term',searching)









export default searchingRouter;