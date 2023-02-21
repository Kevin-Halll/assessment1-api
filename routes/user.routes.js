const express = require('express');
const router = express.Router();
const user = require('../controllers/user.controller');

router.route('/')
.get(user.getAllUsers)
.post(user.createUser)

router.route('/:id')
.delete(user.deleteUser)
.get(user.findUserById)
.patch(user.updateUser)
module.exports = router;

// router.route('/').get(user.getPaginatedItems)