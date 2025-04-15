const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const db = require('../models');

const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET); // decode and verify
      req.user = await db.User.findByPk(decoded.id, { attributes: { exclude: ['password'] } });
      if (!req.user) {
        return res.status(401).json({ message: 'User not found' });
      }
      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Token verification failed' });
    }
  }
  if (!token) {
    res.status(401).json({ message: 'No token provided' });
  }
});


const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error('Not authorized as an admin');
  }
};

module.exports = { protect, admin };