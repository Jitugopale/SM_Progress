import express from "express"
import { getUserController, LoginController, RegisterController } from "../controllers/authController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { errorHandler } from "../errorhandler.js";

const userRouter = express.Router();

userRouter.post("/register",errorHandler(RegisterController))
userRouter.post("/login",errorHandler(LoginController))
userRouter.get("/getUser",authMiddleware,errorHandler(getUserController))

export default userRouter;
