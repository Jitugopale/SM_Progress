import jwt from "jsonwebtoken";
import dotenv from "dotenv"
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

export const authMiddleware = (req, res, next) => {

  // If role is User
  try {
    const token = req.header("auth-token");

    if (!token) {
      return res.status(401).json("Unauthorized Access");
    }

    const user = jwt.verify(token, JWT_SECRET);
   
    if(!user){
        return res.status(401).json("Unauthorized Access");
    }
    req.user = user;

    next();
    

  } catch (error) {
    return res.status(401).json("Unauthorized Access");
  }
};
