import User from "../models/user.js";
import bcryptjs from "bcryptjs";
import { generateJwt } from "../helpers/generate-jwt.js";
import { googleVerify } from "../helpers/google-verify.js";



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

        const token = await generateJwt(user.id);


        res.json({ msg: 'ok login', user, token })

    } catch (error) {

        console.log(error);
        res.status(500).json({ msg: 'something wrong happens,talk with the admin' });
    }




}

export const googleSigIn = async (req, res) => {

    const { id_token } = req.body;

    try {

        const { name, img, email } = await googleVerify(id_token);
        console.log(name, email, id_token);

        let user = await User.findOne({ email })
        console.log(user);
        if (!user) {
            // create user
            const data = {
                name,
                email,
                password: ";P",
                img,
                rol: "USER_ROLE",
                google: true,
            };
            user = new User(data);

            await user.save();
        }
        if (!user.state) {
            return res.status(401).json({
                msg: 'conect with admin ,user block'
            })
        }

        const token = await generateJwt(user.id);

        res.json({ user, token })

    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: 'token could not be verify'
        })
    }




}
