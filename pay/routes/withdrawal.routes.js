const express = require('express');
const { withdraw } = require('../controllers/withdrawal.controller.js');
const { authMiddleware } = require('../middleware/auth.middleware.js');

const router = express.Router();
router.post('/', authMiddleware, withdraw);

module.exports = router;
