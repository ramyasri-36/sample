import express from 'express';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();

// Middleware for verifying JWT
const verifyToken = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ message: "Access denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid token" });
  }
};

// Get User Profile
router.get('/profile', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Add & Remove Friends
router.put('/friends/:friendId', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const friend = await User.findById(req.params.friendId);

    if (!user || !friend) return res.status(404).json({ message: "User not found" });

    if (user.friends.includes(friend._id)) {
      user.friends = user.friends.filter(id => id.toString() !== friend._id.toString());
    } else {
      user.friends.push(friend._id);
    }

    await user.save();
    res.json({ message: "Friend list updated", friends: user.friends });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

export default router;
