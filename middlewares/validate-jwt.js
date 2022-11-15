import jwt from 'jsonwebtoken'



export const validateJwt = (req, res, next) => {

    const token = req.header('x-token');
    console.log(token);
    if (!token) {
        console.log(token);
        return res.status(401).json({ msg: 'request have not token' })
    }
    next()
} 