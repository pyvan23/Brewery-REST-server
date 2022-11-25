import Product from "../models/product.js";


//get categories - paginate - total -populate


export const getProducts = async (req, res) => {

    const { limits = 5, since = 0 } = req.query;


    const [total, products] = await Promise.all([

        Product.countDocuments({ state: true }),
        Product.find({ state: true }).populate('user', 'name').skip(Number(since)).limit(Number(limits))
    ])

    res.status(200).json({ total, products });


}



//get categorie - populate

export const getCategoryById = async (req, res) => {

    const { id } = req.params


    const categorie = await Category.findById(id).populate('user', 'name')

    res.status(200).json(categorie);

}


export const createProducts = async (req, res) => {

    const name = req.body.name.toUpperCase();
    const category = req.body.category
    const categoryStr = category.
    console.log(category);
    
    const productDB = await Product.findOne({ name });
    const categoryDB = await Product.findOne({ category });

    if (productDB) {
        return res.status(400).json({
            msg: `${productDB.name}, already exist`
        })
    }
    if (!categoryDB) {
        return res.status(400).json({
            msg: `${productDB.name}, not exist`
        })
    }

    //generate data
    const data = {
        name,   user: req.user._id,
    }

    const product = await new Product(data);
    //save in DB
    await product.save();

    res.status(201).json(product);

};
//update categorie - product

export const updateCategories = async (req, res) => {

    const { id } = req.params;
    const { state, user, ...data } = req.body;

    //category
    data.name = data.name.toUpperCase();
    //user owner token
    data.user = req.user._id

    const updateCategory = await Product.findByIdAndUpdate(id, data, { new: true });

    console.log(updateCategory);
    res.status(201).json(updateCategory)

}

//delete categorie - state false

export const deleteCategory = async (req, res) => {

    const { id } = req.params;
    const category = await Category.findByIdAndUpdate(id, { state: false });


    res.json({ msg: category });



}