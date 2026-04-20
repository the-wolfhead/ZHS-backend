const express = require('express');
const { authMiddleware } = require('../middleware/auth.middleware.js');
const { create, release, cancel } = require('../controllers/escrow.controller.js');

const router = express.Router();

router.post('/create', authMiddleware, create);
router.post('/release', authMiddleware, release);
router.post('/cancel', authMiddleware, cancel);

module.exports = router;
