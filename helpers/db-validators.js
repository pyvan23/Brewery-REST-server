import Role from "../models/role.js";


export const isRolValid = async (rol = '') => {
    const existRol = await Role.findOne({ rol });
    if (!existRol) {
        throw new Error(`this rol ${rol} is not register in BD`);
    }

}


