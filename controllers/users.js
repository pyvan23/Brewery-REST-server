import User from "../models/user.js";
import bcryptjs from "bcryptjs";


export const getUsers = async (req, res) => {

    const { limits = 5, since = 0 } = req.query;


    const [total, users] = await Promise.all([
        User.countDocuments({ state: true }),
        User.find({ state: true }).skip(Number(since)).limit(Number(limits))
    ])

    res.json({ total, users });
};

export const postUsers = async (req, res) => {

    const { name, email, password, rol } = req.body;
    const user = new User({ name, email, password, rol });

    //encript password
    const salt = await bcryptjs.genSalt();
    user.password = bcryptjs.hashSync(password, salt);

    await user.save();

    res.json({ msg: "created ", user });
};

export const putUsers = async (req, res) => {

    const { id } = req.params;
    const { _id, password, goggle, email, ...resto } = req.body;

    if (password) {
        //encript password
        const salt = await bcryptjs.genSalt();
        resto.password = bcryptjs.hashSync(password, salt);
    }
    const user = await User.findByIdAndUpdate(id, resto, { new: true });

    res.json({ msg: "put controller updated", user });
};

export const patchUsers = (req, res) => {
    res.json({ msg: "patch controller" });
};

export const deleteUsers = async (req, res) => {


    const { id } = req.params;
    const user = await User.findByIdAndUpdate(id, { state: false });
    console.log(user);

    res.json({ msg: user });

};
