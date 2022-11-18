import jwt from 'jsonwebtoken'
import User from "../models/user.js";




export const validateJwt = async (req, res, next) => {

    const token = req.header('x-token');

    if (!token) {

        return res.status(401).json({ msg: 'request have not token,unauthorized error' })
    }

    try {

        const { uid } = jwt.verify(token, process.env.SECRET_KEY);

        //read user uid to know if is register in DB
        const user = await User.findById(uid);
        //verify if user state is in true or false in DB
        
        if (!user) {
            return res.status(401).json({ msg: 'user was deleted, ' });
        }
        if (!user.state) {
            return res.status(401).json({ msg: 'Token invalid - user state false ' });
        }
        //create a property in the request,so i can acces to the request body with user info
        req.user = user;

        next()

    } catch (error) {

        res.status(401).json({ msg: 'token invalid' })
    }


} 