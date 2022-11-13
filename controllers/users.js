import User from "../models/user.js";
import bcryptjs from "bcryptjs";





export const getUsers = (req, res) => {

    const { q, name = 'not name', apiKey, page = 1, limit = 5 } = req.query

    res.json({ msg: "home page two example", q, apiKey, name, page, limit });
}

export const postUsers = async (req, res) => {

    const { name, email, password, rol } = req.body;
    const user = new User({ name, email, password, rol });

    //encript password
    const salt = await bcryptjs.genSalt();
    user.password = bcryptjs.hashSync(password, salt);

    await user.save()


    res.json({ msg: 'created ', user });
}

export const putUsers = async (req, res) => {

    const { id } = req.params;
    const { password, goggle, email, ...resto } = req.body;
    if (password) {

        //encript password
        const salt = await bcryptjs.genSalt();
        resto.password = bcryptjs.hashSync(password, salt);
    }
    const user = await User.findByIdAndUpdate(id, resto)


    res.json({ msg: 'put controller updated', user });
}

export const patchUsers = (req, res) => {
    res.json({ msg: 'patch controller' });
}

export const deleteUsers = (req, res) => {
    res.json({ msg: 'delete controller' });
}