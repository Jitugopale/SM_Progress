import express from "express";
import cors from "cors";
import dotenv from "dotenv"
import userRouter from "./routes/authRoutes.js";
import { poolConnect } from "./db/db.js";
dotenv.config();

const app = express();

const PORT = process.env.PORT;
await poolConnect();

app.use(express.json());

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "auth-token"],
  })
);

app.get("/", (req, res) => {
  res.send("backend is running");
});

app.use("/api",userRouter)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});