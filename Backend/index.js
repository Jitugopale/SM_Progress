import express from "express";
import cors from "cors";
import dotenv from "dotenv"
dotenv.config();

const app = express();

const PORT = process.env.PORT;

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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});