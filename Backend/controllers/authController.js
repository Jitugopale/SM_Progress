import { hashSync, compareSync } from "bcrypt";
import { pool, sql } from "../db/db.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

//Register User
export const RegisterController = async (req, res) => {
  try {
    const { name, email, PhoneNo, address, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const hashPass = hashSync(password, 10);

    const registerRequest = pool.request();
    await registerRequest
      .input("name", sql.VarChar, name)
      .input("email", sql.VarChar, email)
      .input("PhoneNo", sql.VarChar, PhoneNo)
      .input("address", sql.VarChar, address)
      .input("password", sql.VarChar, hashPass).query(`
            INSERT INTO userRegister(Name, Email, PhoneNo, Address, Password)
            VALUES (@name, @email, @PhoneNo, @address, @password)
            `);

    // Fetch user (without password)

    const fetchRequest = pool.request();
    const result = await fetchRequest.input("email", sql.VarChar, email).query(`
            SELECT * FROM userRegister WHERE Email= @email
            `);

    const userData = result.recordset[0]; //fetches that first (and often only) result
    return res
      .status(201)
      .json({ message: "User registered successfully", user: userData });
  } catch (error) {
    console.error("Registration Error:", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

//Login User

export const LoginController = async (req, res) => {
  const { email, password } = req.body;
  if (email == ADMIN_EMAIL && password == ADMIN_PASSWORD) {
    const token = jwt.sign({ email: ADMIN_EMAIL, role: "Admin" }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });
    return res
      .status(200)
      .json({ message: "Login successful", token });
  } else {
    try {
      if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" });
      }

      const loginRequest = pool.request();
      const result = await loginRequest.input("email", sql.VarChar, email)
        .query(`
        SELECT * FROM userRegister WHERE Email = @email
        `);

      const user = result.recordset[0];

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const comparePassword = compareSync(password, user.Password);
      if (!comparePassword) {
        return res.status(400).json({ error: "Invalid Password" });
      }

      const token = jwt.sign({ id: user.userId, role: user.Role }, JWT_SECRET, {
        expiresIn: JWT_EXPIRES_IN,
      });

      return res
        .status(200)
        .json({ message: "Login successful", user: user, token });
    } catch (error) {
      console.error("Login Error:", error.message);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
};


//Get User

export const getUserController = async (req, res) => {

  // If admin, return admin profile
  if (req.user.role === "Admin") {
    return res.status(200).json({
      user: {
        email: req.user.email,
        role: req.user.role
      }
    });
  }
  
  const userId = req.user.id;

  const getUserRequest = pool.request();
  const user = await getUserRequest
    .input("userId", sql.Int, userId)
    .query(`
        SELECT * FROM userRegister WHERE userId = @userId
    `);

    if(!user){
        return res.status(404).json({ message: "User not found" });
    }

    const userData = user.recordset[0];

    return res.status(200).json({ user: userData });
};
