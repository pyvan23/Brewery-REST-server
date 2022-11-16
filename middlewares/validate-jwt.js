import jwt from 'jsonwebtoken'
import User from "../models/user.js";




export const validateJwt = async (req, res, next) => {

    const token = req.header('x-token');
    console.log(token);
    if (!token) {
        console.log(token);
        return res.status(401).json({ msg: 'request have not token' })
    }

    try {

        const { uid } = jwt.verify(token, process.env.SECRET_KEY);
        const userAuthenticated = await User.findById(uid);

        req.user = userAuthenticated

        next()
        
    } catch (error) {

        res.status(401).json({ msg: 'token invalid' })
    }


} 