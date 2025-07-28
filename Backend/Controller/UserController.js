const User = require("../Model/UserModel");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')
const secret = process.env.SECRET


exports.register = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      email,
      password: hashedPassword,
      role: role || "user",
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
    
  } catch (err) {
    console.error("Register Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};


exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user){
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch){
      return res.status(400).json({ message: "Invalid credentials" });
    }

    if (user.role !== "admin"){
      return res.status(403).json({ message: "Access denied. Admins only." });
    }

    const token = jwt.sign({email, role: user.role}, secret, {expiresIn: "24h"})

    res.status(200).json({message: "Login successful", token, user: { email: user.email, role: user.role },});
  
} catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
