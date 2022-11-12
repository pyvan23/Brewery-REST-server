import { Router } from 'express';

const router = Router();



router.get("/", (req, res) => {
    res.json("home page one");
});

router.put("/", (req, res) => {
    res.json({ msg: 'put' });
});

router.post("/", (req, res) => {
    res.json({ msg: 'post' });
});

router.delete("/", (req, res) => {
    res.json({ msg: 'delete' });
});

export default router;