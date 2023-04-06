const router = require('express').Router();
const auth = require('./auth');
const users = require('./user');
const cabBooking = require('./cab');
const payment = require('./payments');


router.use('/api/v1/auth', auth);
router.use('/api/v1/user', users);
router.use('/api/v1/create-booking', cabBooking);
router.use('/', payment);


module.exports = router;

