const express = require('express');
const router = express.Router();
const auth = require('../controllers/auth.controller');

router.route('/').post(auth.authUser)

module.exports = router