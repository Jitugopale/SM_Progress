import { hashSync, compareSync } from "bcrypt";
import { pool, sql } from "../db/db.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { BadRequestException } from "../exceptions/bad-request.js";
import { ErrorCodes } from "../exceptions/root.js";
import { NotFoundException } from "../exceptions/not-found.js";
import { userRegisterSchema } from "../schema/user.js";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

//Register User
export const RegisterController = async (req, res, next) => {
  const userSchema = userRegisterSchema.parse(req.body);
  if (
    !userSchema.name ||
    !userSchema.email ||
    !userSchema.PhoneNo ||
    !userSchema.address ||
    !userSchema.password
  ) {
    return next(
      new BadRequestException(
        "All fields are required",
        ErrorCodes.ALL_FEILDS_REQUIRED
      )
    );
  }

  const existingUserRequest = pool.request();

  const existingResult = await existingUserRequest
    .input("email", sql.VarChar, userSchema.email)
    .query(`SELECT * FROM userRegister WHERE Email = @email`);

  if (existingResult.recordset.length > 0) {
    return next(
      new BadRequestException(
        "User already exists",
        ErrorCodes.USER_ALREADY_EXISTS
      )
    );
  }

  if(userSchema.PhoneNo.length != 10){
    return next(
      new BadRequestException(
        "Phone number must be 10 digits",
        ErrorCodes.PHONE_NUMBER_INVALID
      )
    );
  }

  const hashPass = hashSync(userSchema.password, 10);

  const registerRequest = pool.request();
  await registerRequest
    .input("name", sql.VarChar, userSchema.name)
    .input("email", sql.VarChar, userSchema.email)
    .input("PhoneNo", sql.VarChar, userSchema.PhoneNo)
    .input("address", sql.VarChar, userSchema.address)
    .input("password", sql.VarChar, hashPass).query(`
            INSERT INTO userRegister(Name, Email, PhoneNo, Address, Password)
            VALUES (@name, @email, @PhoneNo, @address, @password)
            `);

  // Fetch user (without password)

  const fetchRequest = pool.request();
  const result = await fetchRequest
    .input("email", sql.VarChar, userSchema.email)
    .query(
      `SELECT Name, Email, PhoneNo, Address FROM userRegister WHERE Email = @email`
    );

  const userData = result.recordset[0]; //fetches that first (and often only) result
  return res
    .status(201)
    .json({ message: "User registered successfully", user: userData });
};

//Login User

export const LoginController = async (req, res, next) => {
  const { email, password } = req.body;
  if (email == ADMIN_EMAIL && password == ADMIN_PASSWORD) {
    const token = jwt.sign({ email: ADMIN_EMAIL, role: "Admin" }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });
    return res.status(200).json({ message: "Login successful",user:{Role:"Admin"}, token });
  } else {
    try {
      if (!email || !password) {
        return next(
      new BadRequestException(
        "All fields are required",
        ErrorCodes.ALL_FEILDS_REQUIRED
      )
    );
      }

      const loginRequest = pool.request();
      const result = await loginRequest.input("email", sql.VarChar, email)
        .query(`
        SELECT * FROM userRegister WHERE Email = @email
        `);

      const user = result.recordset[0];

      if (!user) {
        return next(new NotFoundException("User not found",ErrorCodes.USER_NOT_FOUND));
      }

      const comparePassword = compareSync(password, user.Password);
      if (!comparePassword) {
        return next(new BadRequestException("Incorrect password",ErrorCodes.INVALID_PASSWORD));
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
        role: req.user.role,
      },
    });
  }

  const userId = req.user.id;

  const getUserRequest = pool.request();
  const user = await getUserRequest.input("userId", sql.Int, userId).query(`
        SELECT * FROM userRegister WHERE userId = @userId
    `);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const userData = user.recordset[0];

  return res.status(200).json({ user: userData });
};
