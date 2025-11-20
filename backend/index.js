// backend/index.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import connectDb from "./config/db.js";
import authRouter from "./routes/auth.routes.js";
import UserRouter from "./routes/User.routes.js";
// import geminiResponse from "./gemini.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

// ==== CORS (sirf Render frontend allow karega) ====
const allowedOrigin =
  process.env.FRONTEND_URL ||
  "https://elira-the-virtual-assistant.onrender.com";

app.use(
  cors({
    origin: allowedOrigin,
    credentials: true,
  })
);

// ==== Middlewares ====
app.use(express.json());
app.use(cookieParser());

// ==== Routes ====
app.use("/api/auth", authRouter);
app.use("/api/user", UserRouter);

// Simple test route (optional)
app.get("/", (req, res) => {
  res.send("Backend is running");
});

// ==== Start server ====
app.listen(port, () => {
  connectDb();
  console.log(`Server started on port ${port}`);
});
