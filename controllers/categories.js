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
    console.log(id);
    const categorie = await Category.findById(id).populate('user','name')


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

//delete categorie - state false