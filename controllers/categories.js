import Category from "../models/category.js";

//get categories - paginate - total -populate

export const getCategories = async (req, res) => {

    const { limits = 5, since = 0 } = req.query;


    const [total, categories] = await Promise.all([

        Category.countDocuments({ state: true }),
        Category.find({ state: true }).populate('user', 'name').skip(Number(since)).limit(Number(limits))
    ])

    res.status(200).json({ total, categories });


}



//get categorie - populate

export const getCategoryById = async (req, res) => {

    const { id } = req.params


    const categorie = await Category.findById(id).populate('user', 'name')

    res.status(200).json(categorie);

}







export const createCategories = async (req, res) => {

    const name = req.body.name.toUpperCase();
    const categorieDB = await Category.findOne({ name });

    if (categorieDB) {
        return res.status(400).json({
            msg: `categorie ${categorieDB.name}, already exist`
        })
    }

    //generate data
    const data = {
        name, user: req.user._id
    }

    const categorie = await new Category(data);
    //save in DB
    await categorie.save();

    res.status(201).json(categorie);

};
//update categorie - product

export const updateCategories = async (req, res) => {

    const { id } = req.params;
    const { state, user, ...data } = req.body;

    //category
    data.name = data.name.toUpperCase();
    //user owner token
    data.user = req.user._id

    const updateCategory = await Category.findByIdAndUpdate(id, data, { new: true });

    console.log(updateCategory);
    res.status(201).json(updateCategory)

}

//delete categorie - state false

export const deleteCategory = async (req, res) => {

    const { id } = req.params;
    const category = await Category.findByIdAndUpdate(id, { state: false });


    res.json({ msg: category });



}