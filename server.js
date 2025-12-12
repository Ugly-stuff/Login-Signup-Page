import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import User from "./models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const JWT_SECRET = "souvik_secret_key";
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// For signup
app.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.json({ status: "error", message: "Email and password are required" });
    }
    
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.json({ status: "error", message: "User already exists" });
    const newUser = new User({ email, password });
    await newUser.save();
    res.json({ status: "ok", message: "User Registered Successfully" });
  } catch (error) {
    console.error("Signup error:", error);
    res.json({ status: "error", message: error.message });
  }
});

// For login
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.json({ status: "error", message: "Email and password are required" });
    }
    
    const user = await User.findOne({ email });
    if (!user) return res.json({ status: "error", message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.json({ status: "error", message: "Wrong Password" });

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "1h" });
    res.json({ status: "ok", token });
  } catch (error) {
    console.error("Login error:", error);
    res.json({ status: "error", message: error.message });
  }
});

app.listen(5000, () => console.log("Server running on Port 5000"));