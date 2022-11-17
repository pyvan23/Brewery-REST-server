


export const isAdminRole = (req, res, next) => {

    if (!req.user) {
        return res.status(500).json({ msg: 'someone wants to verify without validate token first' });
    }

    const { name, rol } = req.user

    if (rol !== 'ADMIN_ROLE') {
        return res.status(401).json(`${name} dont have the admin credentials`);
    }


    next()


}