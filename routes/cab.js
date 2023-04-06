const router = require('express').Router();
const { verifyToken } = require('../utils/verifyToken');
const { 
    //createBooking, 
    updateBooking, 
    getNearByCab,
    deleteCab,
    addingCharge,
    getBookingHistory,
    getLocation
} = require('../controllers/cab');
const { verifyUser, verifyDriver } = require('../utils/verifyAdmin');

//router.post("/booking", verifyDriver, createBooking);

router.put("/booking-status/:id", verifyToken, updateBooking);

router.get('/bookingHistory', verifyDriver, getBookingHistory)

router.get("/get-near-by-cab", getNearByCab);

router.post('/booking-status/:driverId', verifyDriver, addingCharge);

router.put('/delete/:id', verifyToken, deleteCab);

router.get('/getLocation', verifyToken, getLocation);

module.exports = router;