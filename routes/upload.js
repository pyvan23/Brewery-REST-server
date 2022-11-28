import { Router } from "express";
import { check } from "express-validator";
import { uploadFile } from "../controllers/upload.js";

import { validateFields } from "../middlewares/validate-fields.js";


const uploadRouter = Router();

uploadRouter.post('/',uploadFile)

export default uploadRouter;
