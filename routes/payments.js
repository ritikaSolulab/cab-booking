const router = require('express').Router();
const {
	createPayment,
	// getPayment,
	// updatePayment,
	// getPayments,
	// deletePayment
} = require('../controllers/payment');
//const { verifyToken } = require('../utils/verifyToken');


//router.post('/v1/charges', createPayment);
// router.get('/:paymentId', verifyToken, getPayment);
// router.get('/', getPayments);
// router.put('/:paymentId', verifyToken, updatePayment);
// router.put('/delete/:paymentId', verifyToken, deletePayment);

module.exports = router;
