import { Router } from "express";
import HomeController from '../controllers/home.controller';
import authRouter from "./auth.route";
const router = Router();

router.get("/",HomeController.index)
router.use("/auth",authRouter)

export default router