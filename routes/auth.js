const express = require('express');
const router = express.Router();
const { signup, login, getUserStatus, updateUserStatus } = require('../controllers/auth');
const isAuth = require('../middleware/is-auth');

router.put('/signup', signup);
router.post('/login', login);
router.get('/status', isAuth, getUserStatus);
router.put('/status', isAuth, updateUserStatus)

module.exports = router;