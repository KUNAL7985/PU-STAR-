import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

// Login only (no public registration)
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });
    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(401).json({ error: 'Invalid credentials' });
    const token = jwt.sign({ id: user._id, role: user.role, facultyId: user.facultyId }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, role: user.role, facultyId: user.facultyId });
  } catch (e) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
