import { Router } from 'express';
import { check } from 'express-validator';
import { deleteUsers, getUsers, patchUsers, postUsers, putUsers } from '../controllers/users.js';

const router = Router();



router.get("/", getUsers);

router.put("/:id", putUsers);

router.post("/", [
    check('email', 'This email in not valid ').isEmail(),
], postUsers);

router.delete("/", deleteUsers);

router.patch("/", patchUsers);

export default router;