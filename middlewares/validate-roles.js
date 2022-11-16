


export const IsAdminRole = (req, res, next) => {

    if (!req.user) {
        return res.status(500).json({ msg: 'something wants to verify without validate token first' })
    }


    next()


}