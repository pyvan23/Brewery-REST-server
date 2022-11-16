import jwt from 'jsonwebtoken'
import User from "../models/user.js";




export const validateJwt = async (req, res, next) => {

    const token = req.header('x-token');
    console.log(token);
    if (!token) {
        
        return res.status(401).json({ msg: 'request have not token' })
    }

    try {

        const { uid } = jwt.verify(token, process.env.SECRET_KEY);
        //read user uid to know
        const userAuthenticated = await User.findById(uid);
        //verify if user state is in true or false
        if (!userAuthenticated.state) {
            return res.status(401).json({msg:'Token invalid - user state false '});
        }

        req.user = userAuthenticated

        next()

    } catch (error) {

        res.status(401).json({ msg: 'token invalid' })
    }


} 