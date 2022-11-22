import Category from "../models/category.js";
import Role from "../models/role.js";
import User from "../models/user.js";


export const isRolValid = async (rol = '') => {
    const existRol = await Role.findOne({ rol });
    if (!existRol) {
        throw new Error(`this rol ${rol} is not register in BD`);
    }

}


export const isEmailExist = async (email = '') => {

    const emailExist = await User.findOne({ email });
    if (emailExist) {
        throw new Error(`This email ${email}, is not valid`)
    }

}
export const isUserExist = async (id) => {

    const userExist = await User.findById(id);
    if (!userExist) {
        throw new Error(`This user ${id}, is not valid`)
    }

}
export const isCategoryExist = async (id) => {

    const categoryExist = await Category.findById(id);

    if (!categoryExist) {
        throw new Error(`This category ${id}, is not valid`)
    }

}