import User from "../models/user.js";
import bcryptjs from "bcryptjs";



export const login = async (req, res) => {

    const { email, password } = req.body;

    try {

        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ msg: 'This email es invalid' })
        }

        if (!user.state) {
            return res.status(400).json({ msg: 'This user is false ' })
        }

        const validPassword = bcryptjs.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(400).json('password incorrect')
        }

        res.json({ msg: 'ok login', })

    } catch (error) {

        console.log(error);
        res.status(500).json({ msg: 'something wrong happens,talk with the admin' });
    }




}