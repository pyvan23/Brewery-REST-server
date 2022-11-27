import Product from "../models/product.js";
import Category from "../models/category.js";
import { body } from "express-validator";


//get categories - paginate - total -populate


export const getProducts = async (req, res) => {

    const { limits = 5, since = 0 } = req.query;


    const [total, products] = await Promise.all([

        Product.countDocuments({ state: true }),
        Product.find({ state: true })
            .populate('user', 'name')
            .populate('category', 'name')
            .skip(Number(since))
            .limit(Number(limits))
    ])

    res.status(200).json({ total, products });


}



//get categorie - populate

export const getProductById = async (req, res) => {

    const { id } = req.params

    const product = await Product.findById(id)
        .populate('user', 'name')
        .populate('category', 'name')

    res.status(200).json(product);

}


export const createProducts = async (req, res) => {

    const { state, user, ...body } = req.body;
    const productDB = await Product.findOne({ name: body.name });

    if (productDB) {
        return res.status(400).json({
            msg: `${productDB.name}, already exist`
        })
    }

    //generate data
    const data = {
        ...body,
        name: body.name.toUpperCase(),
        user: req.user._id,
    }

    const product = await new Product(data);
    //save in DB
    await product.save();

    res.status(201).json(product);

};
//update products - product

export const updateProduct = async (req, res) => {

    const { id } = req.params;
    const { state, user, ...data } = req.body;

    if (data.name) {

        data.name = data.name.toUpperCase();
    }
    //user owner token
    data.user = req.user._id

    const updateProduct = await Product.findByIdAndUpdate(id, data, { new: true });

    res.status(201).json(updateProduct)
}

//delete products - state false

export const deleteProduct = async (req, res) => {

    const { id } = req.params;
    const productDelete = await Product.findByIdAndUpdate(id, { state: false }, { new: true });


    res.json({ msg: productDelete });



}