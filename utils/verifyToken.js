const jwt = require('jsonwebtoken');
const User = require('../models/User');

// for verifying the token
exports.verifyToken = async (req, res, next) => {
    try{
        const token = req.header('access_token');
        if (!token) {
            return res.status(400).send('Access Denied');
        }

        const verifyData = await jwt.verify(token, process.env.JWT)
        const currentUser = await User.findOne({_id:verifyData.id})
        if(!currentUser) return res.status(400).send('Invalid token');
        req.user = currentUser;
        next()
    }catch(err){
        return res.status(400).json('Token is not valid')
    }
};

