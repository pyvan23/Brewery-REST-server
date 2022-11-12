import { Router } from 'express';
import { deleteUsers, getUsers, patchUsers, postUsers, putUsers } from '../controllers/users.js';

const router = Router();



router.get("/", getUsers);

router.put("/:id", putUsers);

router.post("/", postUsers);

router.delete("/", deleteUsers);

router.patch("/", patchUsers);

export default router;