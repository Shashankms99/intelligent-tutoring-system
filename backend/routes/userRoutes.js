// userRoutes.js

const express = require('express');
const { getusers } = require('../controllers/userController');
const router = express.Router();

// Route to get users based on role (either 'tutor' or 'student')
router.get('/:role', getusers);

module.exports = router;
