const asyncHandler = require('express-async-handler');
const db = require('../models');
const generateToken = require('../utils/generateToken');
const { validateRegisterInput, validateLoginInput } = require('../utils/validators');

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    const { errors, valid } = validateRegisterInput(name, email, password);

    if (!valid) {
        return res.status(400).json({
            success: false,
            message: Object.values(errors).join(', ')
        });
    }

    const userExists = await db.User.findOne({ where: { email } });

    if (userExists) {
        return res.status(400).json({
            success: false,
            message: 'User already exists'
        });
    }

    const user = await db.User.create({
        name,
        email,
        password
    });

    if (user) {
        const token = generateToken(user.id);

        return res.status(201).json({
            success: true,
            id: user.id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token
        });
    } else {
        return res.status(400).json({
            success: false,
            message: 'Invalid user data'
        });
    }
});

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const { errors, valid } = validateLoginInput(email, password);

    if (!valid) {
        return res.status(400).json({
            success: false,
            message: Object.values(errors).join(', ')
        });
    }

    const user = await db.User.findOne({ where: { email } });

    if (user && (await user.comparePassword(password))) {
        const token = generateToken(user.id);

        return res.json({
            success: true,
            id: user.id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token
        });
    } else {
        return res.status(401).json({
            success: false,
            message: 'Invalid email or password'
        });
    }
});

// @desc    Get user profile
// @route   GET /api/auth/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
    const user = await db.User.findByPk(req.user.id, {
      attributes: { exclude: ['password'] }
    });
  
    if (user) {
      res.json({
        id: user.id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin
      });
    } else {
      res.status(404);
      throw new Error('User not found');
    }
  });

module.exports = { registerUser, authUser, getUserProfile };