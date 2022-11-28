import { Router } from "express";
import { check } from "express-validator";
import { upload } from "../controllers/upload.js";

import { validateFields } from "../middlewares/validate-fields.js";


const uploadRouter = Router();

uploadRouter.get('/',upload)

export default uploadRouter;
