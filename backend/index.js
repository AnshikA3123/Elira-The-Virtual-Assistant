import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDb from "./config/db.js";
import authRouter from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import UserRouter from "./routes/User.routes.js";

const app = express();
const port = process.env.PORT || 8000;

// ✅ SIMPLE CORS CONFIG – sirf ye hi use karo
const corsOptions = {
  origin: [
    "https://elira-the-virtual-assistant.onrender.com",  // Render frontend
    //"http://localhost:5173",                             // local dev (optional)
  ],
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRouter);
app.use("/api/user", UserRouter);

app.listen(port, () => {
  connectDb();
  console.log("Server Started");
});
