import { Router } from "express";
import { check } from "express-validator";
import {
    deleteUsers,
    getUsers,
    patchUsers,
    postUsers,
    putUsers,
} from "../controllers/users.js";
import { validateFields } from "../middlewares/validate-fields.js";
import Role from "../models/role.js";


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
        check("email", "This email in not valid ").isEmail(),
        check("rol").custom(async (rol = "") => {
            const existRol = await Role.findOne({ rol });
            if (!existRol) {
                throw new Error(`this rol ${rol} is not register in BD`);
            }
        }),
        validateFields,
    ],
    postUsers
);

router.delete("/", deleteUsers);

router.patch("/", patchUsers);

export default router;
