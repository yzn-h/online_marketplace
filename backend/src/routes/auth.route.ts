import { Router } from "express";
import authController from "../controllers/auth.controller";
import registerValidatMiddleware from "../middlewares/auth/signupValidat.middleware";
const authRouter = Router()

authRouter.post("/login",authController.login)
authRouter.post("/signup",[registerValidatMiddleware],authController.signup)
authRouter.get("/validate",authController.validate)
authRouter.get("/logout",authController.logout)



export default authRouter