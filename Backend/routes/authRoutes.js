import express from "express"
import { getUserController, LoginController, RegisterController } from "../controllers/authController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const userRouter = express.Router();

userRouter.post("/register",RegisterController)
userRouter.post("/login",LoginController)
userRouter.get("/getUser",authMiddleware,getUserController)

export default userRouter;
