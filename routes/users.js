import { Router } from "express";
import { check } from "express-validator";
import {
    deleteUsers,
    getUsers,
    patchUsers,
    postUsers,
    putUsers,
} from "../controllers/users.js";
import { isEmailExist, isRolValid } from "../helpers/db-validators.js";
import { validateFields } from "../middlewares/validate-fields.js";



const router = Router();

router.get("/", getUsers);

router.put("/:id", putUsers);

router.post(
    "/",
    [
        check("name", "This name is not valis or is required").not().isEmpty(),
        check("password", "Password must be have more than 6 characters").isLength({
            min: 6,
        }),
        check("email").custom(isEmailExist).isEmail(),
        check("rol").custom(isRolValid),
        validateFields,
    ],
    postUsers
);

router.delete("/", deleteUsers);

router.patch("/", patchUsers);

export default router;
