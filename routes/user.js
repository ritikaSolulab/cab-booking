const router = require('express').Router();
const { 
    getUser,
    getUsers,
    grantAccess,
    updateUser,
    deleteUser,
    defaultIsDeleted
} = require('../controllers/user');
const { verifyToken } = require('../utils/verifyToken')
const { verifyAdmin, verifyUser} = require('../utils/verifyAdmin');

router.get('/all', verifyAdmin, getUsers);

router.get('/get-user', verifyToken, getUser);

router.put('/update', verifyToken, updateUser);

router.put('/delete/:userId', verifyUser, deleteUser);

router.put('/del/:userId', verifyUser, defaultIsDeleted)

module.exports = router;