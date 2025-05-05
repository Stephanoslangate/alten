const express = require('express');
const router = express.Router();
const { account, token } = require('../controllers/authController');

router.post('/account', account);
router.post('/token', token);

module.exports = router;