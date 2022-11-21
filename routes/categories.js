import { Router } from "express";
import { check } from "express-validator";

import { validateFields } from "../middlewares/validate-fields.js";


const categoriesRouter = Router();

//all categories - public
categoriesRouter.get('/',(req,res)=>{
    res.json({msg:'get all categories'})
})
//one categorie - public
categoriesRouter.get('/:id',(req,res)=>{
    res.json({msg:' get one categorie'})
})
//update - private -anyone who takes a valid token
categoriesRouter.post('/',(req,res)=>{
    res.json({msg:' post one categorie'})
})
//update - private -anyone who takes a valid token
categoriesRouter.put('/:id',(req,res)=>{
    res.json({msg:' put update '})
})
//only ADMIN_USER - private
categoriesRouter.delete('/:id',(req,res)=>{
    res.json({msg:' delete update '})
})


export default categoriesRouter;
