const router = require('express').Router();
const { register } = require('../controllers/auth/register');
const { login,resetPassword,forgotPassword } = require('../controllers/auth/login');
const { verifyToken } = require('../utils/verifyToken');


// for registering
router.post('/register', register);

// for login
router.post('/login', login);

//reset password 
router.post('/resetPassword', verifyToken, resetPassword)

//forgot password
router.post('/forgot-password', verifyToken, forgotPassword)


module.exports = router;