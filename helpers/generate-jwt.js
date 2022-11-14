import jwt from 'jsonwebtoken'



export const generateJwt = (uid = '') => {

    return new Promise((resolve, reject) => {

        const payload = { uid };

        jwt.sign(payload, process.env.SECRET_KEY, {
            expiresIn: '4h'
        }, (err, token) => {

            if (err) {
                console.log(err);
                reject(' somesthing wrong happens,token can not be created')
            } else {

                resolve(token)
            }

        })

    })



} 