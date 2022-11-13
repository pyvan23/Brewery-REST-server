import { Router } from "express";
import { check } from "express-validator";
import { login } from "../controllers/auth.js";
import { validateFields } from "../middlewares/validate-fields.js";

const router = Router();

router.post(
    "/login",
    [
        check("email", "The email es required").isEmail(),
        check("password", "password is required").not().isEmpty(),
        validateFields,
    ],
    login
);

export default router;
