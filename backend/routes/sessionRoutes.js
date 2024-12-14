const express = require('express');
const router = express.Router();
const { getsessions } = require('../controllers/sessionController');

router.get('', getsessions);

module.exports = router;