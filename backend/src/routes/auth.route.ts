import { Router } from "express";
import authController from "../controllers/auth.controller";
const authRouter = Router()

authRouter.post("/login",authController.login)
authRouter.post("/register",authController.register)
authRouter.get("/validate",authController.validate)
authRouter.get("/logout",authController.logout)



export default authRouter