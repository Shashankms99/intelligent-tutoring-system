const express = require('express');
const { register, login } = require('../controllers/authController');
const router = express.Router();

router.post('/register', register);  // Handles user registration
router.post('/login', login);  // Handles user login

module.exports = router;
