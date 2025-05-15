import { Router } from "express";
import { createUser, loginUser } from "../controllers/user.controller.js";
const router = Router();
import { authenticateUser } from "../middleware/authenticate.js";



router.post('/create',  createUser);
router.post('/login',  loginUser);


export default router;