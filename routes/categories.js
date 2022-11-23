import { Router } from "express";
import { check } from "express-validator";
import { createCategories, getCategoryById, getCategories, updateCategories, deleteCategory } from "../controllers/categories.js";
import { isCategoryExist, isRolValid,  } from "../helpers/db-validators.js";

import { validateFields } from "../middlewares/validate-fields.js";
import { validateJwt } from "../middlewares/validate-jwt.js";
import { isAdminRole } from "../middlewares/validate-roles.js";


const categoriesRouter = Router();

//all categories - public
categoriesRouter.get('/', getCategories)

//one categorie - public
categoriesRouter.get('/:id',
    [check("id", "this id is not valid")
        .isMongoId(),
    check('id')
        .custom(isCategoryExist),
        validateFields,
    ], getCategoryById)

//update - private -anyone who takes a valid token
categoriesRouter.post('/',
    [validateJwt,
        check('name', 'name is required').not().isEmpty(),
        validateFields,
    ], createCategories)

//update - private -anyone who takes a valid token
categoriesRouter.put('/:id', [validateJwt, check("id", "this id is not valid").isMongoId(),
check('name', 'name is required').not().isEmpty(),
    check("id").custom(isCategoryExist),

    validateFields,], updateCategories)
//only ADMIN_USER - private
categoriesRouter.delete('/:id', 
[validateJwt, isAdminRole,
check("id", "this id is not valid").isMongoId(),
check("id").custom(isCategoryExist),
validateFields],deleteCategory)


export default categoriesRouter;
