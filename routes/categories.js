import { Router } from "express";
import { check } from "express-validator";
import { createCategories, getCategoryById, getCategories } from "../controllers/categories.js";
import { isCategoryExist } from "../helpers/db-validators.js";

import { validateFields } from "../middlewares/validate-fields.js";
import { validateJwt } from "../middlewares/validate-jwt.js";


const categoriesRouter = Router();

//all categories - public
categoriesRouter.get('/', getCategories)

//one categorie - public
categoriesRouter.get('/:id',
    [check("id", "this id is not valid")
        .isMongoId(),
    check('id')
        .custom(isCategoryExist)
    ], getCategoryById)

//update - private -anyone who takes a valid token
categoriesRouter.post('/', [validateJwt,
    check('name', 'name is required').not().isEmpty(),
    validateFields], createCategories)

//update - private -anyone who takes a valid token
categoriesRouter.put('/:id', (req, res) => {
    res.json({ msg: ' put update ' })
})
//only ADMIN_USER - private
categoriesRouter.delete('/:id', (req, res) => {
    res.json({ msg: ' delete update ' })
})


export default categoriesRouter;
