import { Router } from "express";
import { check } from "express-validator";
import { createProducts, deleteProduct, getProductById, getProducts, updateProduct } from "../controllers/products.js";
import { isCategoryExist, isProductExist } from "../helpers/db-validators.js";
import { validateFields } from "../middlewares/validate-fields.js";
import { validateJwt } from "../middlewares/validate-jwt.js";
import { isAdminRole } from "../middlewares/validate-roles.js";


const productsRouter = Router();

//all products - public
productsRouter.get('/', getProducts);

productsRouter.get('/:id',
    [
        check('id', 'id is not valid').isMongoId(),
        check('id').custom(isProductExist),
        validateFields
    ], getProductById);

productsRouter.post('/',
    [validateJwt,
        check('name', 'name is required').not().isEmpty(),
        check('category', 'id is not valid').isMongoId(),
        check('category').custom(isCategoryExist),
        validateFields,
    ], createProducts)

productsRouter.put('/:id',
    [validateJwt,
        // check('category', 'id is not valid').isMongoId(),
        check('id').custom(isProductExist),
        validateFields
    ], updateProduct)

productsRouter.delete('/:id',
    [validateJwt, isAdminRole,
        check('id', 'id is not valid').isMongoId(),
        check('id').custom(isProductExist),
    ], deleteProduct)




export default productsRouter;
