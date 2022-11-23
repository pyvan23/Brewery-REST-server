import { Router } from "express";
import { check } from "express-validator";


const productsRouter = Router();

//all categories - public
productsRouter.get('/',(req,res)=>{
    res.json({msg:'get products'})
} )

//one categorie - public


export default productsRouter;
