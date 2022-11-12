


export const getUsers = (req, res) => {

    const { q, name = 'not name', apiKey, page = 1, limit = 5 } = req.query

    res.json({ msg: "home page two example", q, apiKey, name, page, limit });
}

export const postUsers = (req, res) => {

    const { nombre, edad } = req.body

    res.json({ msg: 'created ', nombre, edad });
}

export const putUsers = (req, res) => {

    const { id } = req.params

    res.json({ msg: 'put controller', id });
}

export const patchUsers = (req, res) => {
    res.json({ msg: 'patch controller' });
}

export const deleteUsers = (req, res) => {
    res.json({ msg: 'delete controller' });
}