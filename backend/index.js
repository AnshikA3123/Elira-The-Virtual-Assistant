import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDb from "./config/db.js";
import authRouter from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import UserRouter from "./routes/User.routes.js";
// import geminiResponse from "./gemini.js"; // agar use nahi kar rahe to rehne do

const app = express();
const port = process.env.PORT || 8000;

// ==== SIMPLE CORS SETUP ====
const allowedOrigins = [
  "https://elira-the-virtual-assistant.onrender.com", // tumhara frontend (Render)
  "http://localhost:5173"                             // local dev ke liye
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

// preflight (OPTIONS) ke liye
app.options("*", cors({
  origin: allowedOrigins,
  credentials: true,
}));

// ==== MIDDLEWARES & ROUTES ====
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/user", UserRouter);

app.listen(port, () => {
  connectDb();
  console.log("Server Started on port", port);
});
