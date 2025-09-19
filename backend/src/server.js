import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();

// ✅ Middleware
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());

// ✅ Auth routes
app.post("/api/auth/register", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password required" });
  }

  // Mock DB insert (replace with MongoDB/MySQL later)
  console.log("New user registered:", email);
  return res.status(201).json({ message: "User registered successfully" });
});

// ✅ Server listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
