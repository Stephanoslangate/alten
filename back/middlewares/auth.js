const jwt = require('jsonwebtoken');
const { findUserById } = require('../config/db');
const dotenv = require('dotenv');

dotenv.config();
//route protégée
exports.protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Access refusé'
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = findUserById(decoded.id);
    
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Utilisateur non trouvé'
      });
    }
    
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: 'Access refusé'
    });
  }
};
