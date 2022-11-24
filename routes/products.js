import { Router } from "express";
import { check } from "express-validator";
import { createProducts } from "../controllers/products.js";


const productsRouter = Router();

//all categories - public
productsRouter.get('/', (req, res) => {
    res.json({ msg: 'get products' })
})
productsRouter.get('/:id', (req, res) => {
    res.json({ msg: 'get product' })
})
productsRouter.post('/', createProducts)

productsRouter.put('/:id', (req, res) => {
    res.json({ msg: 'get products' })
})
productsRouter.delete('/:id', (req, res) => {
    res.json({ msg: 'delete products' })
})

//one categorie - public


export default productsRouter;
