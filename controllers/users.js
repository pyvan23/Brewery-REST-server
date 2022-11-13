import User from "../models/user.js";
import mongoose from "mongoose";
import bcryptjs from "bcryptjs";





export const getUsers = (req, res) => {

    const { q, name = 'not name', apiKey, page = 1, limit = 5 } = req.query

    res.json({ msg: "home page two example", q, apiKey, name, page, limit });
}

export const postUsers = async (req, res) => {

    

    const { name, email, password, rol } = req.body;
    const user = new User({ name, email, password, rol });

    //verify if email exist
    const emailExist = await User.findOne({ email });
    if (emailExist) {
        return res.status(404).json({
            msg: 'The email already exist'
        })
    }


    //encript password
    const salt = await bcryptjs.genSalt();
    user.password = bcryptjs.hashSync(password, salt);

    await user.save()


    res.json({ msg: 'created ', user });
}

export const putUsers = (req, res) => {

    const { id } = req.params

    res.json({ msg: 'put controller', id });
}

export const patchUsers = (req, res) => {
    res.json({ msg: 'patch controller' });
}

export const deleteUsers = (req, res) => {
    res.json({ msg: 'delete controller' });
}