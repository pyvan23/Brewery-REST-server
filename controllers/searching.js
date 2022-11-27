import { isValidObjectId } from "mongoose";
import Category from "../models/category.js";
import Product from "../models/product.js";
import User from "../models/user.js";


const validCollections = ['products', 'categories', 'users']

const lookingForUser = async (term = '', res) => {
    const isMongoId = isValidObjectId(term)

    if (isMongoId) {
        const user = await User.findById(term);
        return res.json({ results: (user) ? [user] : [] })
    }
    const regex = new RegExp(term, 'i')

    const users = await User.find(
        {
            $or:
                [{ name: regex, state: true },
                {
                    email: regex, state: true
                }]
        }
    )
    res.json({ results: users })

}
const lookingForCategories = async (term = '', res) => {
    const isMongoId = isValidObjectId(term)

    if (isMongoId) {
        const category = await Category.findById(term);
        return res.json({ results: (category) ? [category] : [] })
    }
    const regex = new RegExp(term, 'i')

    const categories = await Category.find(
        {
            name: regex,
        }
    )
    res.json({ results: categories })

}
const lookingForProducts = async (term = '', res) => {
    const isMongoId = isValidObjectId(term)

    if (isMongoId) {
        const product = await Product.findById(term)
            .populate('category', 'name')
        return res.json({ results: (product) ? [product] : [] })
    }
    const regex = new RegExp(term, 'i')

    const products = await Product.find(
        {
            name: regex,
        }
    ).populate('category', 'name')
    res.json({ results: products })

}

export const searching = (req, res) => {

    const { collection, term } = req.params;

    if (!validCollections.includes(collection)) {

        return res.status(400).json({ msg: `The valid collection are ${validCollections}` })
    }

    switch (collection) {
        case 'products':
            lookingForProducts(term, res);
            break;
        case 'categories':
            lookingForCategories(term, res);
            break;
        case 'users':
            lookingForUser(term, res);
            break;

        default:
            res.status(500).json({ msg: 'internal server error' })

    }





}