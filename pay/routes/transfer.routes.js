const express = require('express');
const { transfer } = require('../controllers/transfer.controller.js');
const { authMiddleware } = require('../middleware/auth.middleware.js');

const router = express.Router();

router.post('/', authMiddleware, transfer);

module.exports = router;
