import { Router } from "express";
import { check } from "express-validator";
import {
    deleteUsers,
    getUsers,
    patchUsers,
    postUsers,
    putUsers,
} from "../controllers/users.js";
import {
    isEmailExist,
    isRolValid,
    isUserExist,
} from "../helpers/db-validators.js";
import { validateFields } from "../middlewares/validate-fields.js";
import { validateJwt } from "../middlewares/validate-jwt.js";
import { isAdminRole } from "../middlewares/validate-roles.js";

const userRouter = Router();

userRouter.get("/", getUsers);

userRouter.put(
    "/:id",
    [
        check("id", "this id is not valid").isMongoId(),
        check("id").custom(isUserExist),
        check("rol").custom(isRolValid),
        validateFields,
    ],
    putUsers
);

userRouter.post(
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

userRouter.delete("/:id",
    [validateJwt,
        isAdminRole,
        check("id", "this id is not valid").isMongoId(),
        check("id").custom(isUserExist),
        validateFields
    ], deleteUsers);

userRouter.patch("/", patchUsers);

export default userRouter;
