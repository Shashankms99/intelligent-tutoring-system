const express = require('express');
const router = express.Router();
const { createSession, getSessions } = require('../controllers/tutoringController');

// Route to create a session
router.post('/create', createSession);

// Route to get sessions for a specific user (either tutor or student)
router.get('/sessions/:userId', getSessions);

module.exports = router;
