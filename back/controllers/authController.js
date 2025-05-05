const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const { findUserByEmail, addUser } = require('../config/db');

dotenv.config();

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });
};

// Register user
exports.account = async (req, res, next) => {
  const { username,firstname, email, password } = req.body;

  try {
    const existingUser = findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Ulisateur existe déja' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Creation d'un nouveau utilisateur
    const user = {
      id: uuidv4(),
      username,
      firstname,
      email,
      password: hashedPassword,
      createdAt: new Date().toISOString()
    };

    addUser(user);
    const token = generateToken(user.id);

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user.id,
        username: user.username,
        firstname,
        email: user.email,
      }
    });
  } catch (err) {
    next(err);
  }
};

// Login user
exports.token = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ success: false, message: 'Données invalides' });
    }

    const isCorrect = await bcrypt.compare(password, user.password);
    if (!isCorrect) {
      return res.status(401).json({ success: false, message: 'Données invalides' });
    }
    const token = generateToken(user.id);
    res.status(200).json({
      success: true,
      token,
      user: {
        id: user.id,
        username: user.username,
        firstname: user.firstname,
        email: user.email,
      }
    });
  } catch (err) {
    next(err);
  }
};

// Get current user
exports.getMe = async (req, res, next) => {
  try {
    const user = findUserById(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Exclude password from response
    const { password, ...userData } = user;

    res.status(200).json({
      success: true,
      user: userData
    });
  } catch (err) {
    next(err);
  }
};