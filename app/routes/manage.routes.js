import { Router } from "express";
import { getStats } from "../controllers/manage.controller.js";
const router = Router();


router.get('/stats', getStats);

export default router;