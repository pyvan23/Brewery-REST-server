import { Router } from "express";
import { check } from "express-validator";
import { createProducts } from "../controllers/products.js";
import { isCategoryExist } from "../helpers/db-validators.js";
import { validateFields } from "../middlewares/validate-fields.js";
import { validateJwt } from "../middlewares/validate-jwt.js";


const productsRouter = Router();

//all categories - public
productsRouter.get('/', (req, res) => {
    res.json({ msg: 'get products' })
})
productsRouter.get('/:id', (req, res) => {
    res.json({ msg: 'get product' })
})
productsRouter.post('/',
    [validateJwt,
        check('name', 'name is required').not().isEmpty(),
        check('category', 'id is not valid').isMongoId(),
        check('category').custom( isCategoryExist ),
        validateFields,
    ], createProducts)

productsRouter.put('/:id', (req, res) => {
    res.json({ msg: 'get products' })
})
productsRouter.delete('/:id', (req, res) => {
    res.json({ msg: 'delete products' })
})

//one categorie - public


export default productsRouter;
