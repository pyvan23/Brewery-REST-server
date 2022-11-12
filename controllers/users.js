import User from "../models/user.js";
import mongoose from "mongoose";




export const getUsers = (req, res) => {

    const { q, name = 'not name', apiKey, page = 1, limit = 5 } = req.query

    res.json({ msg: "home page two example", q, apiKey, name, page, limit });
}

export const postUsers = async (req, res) => {

    const body = req.body;
    const user = new User(body);
    await user.save()


    res.json({ msg: 'created ', user });
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