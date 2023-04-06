const User = require('../models/User');


exports.getUsers = async (req, res, next) => {
    const { page, limit } = req.query
    let match = {};
    if (req.query.search) match.role = {$regex: req.query.search, $options: 'i'};
    const users = await User.find(match).limit(limit);
    res.status(200).json({
        page,
        //match,
        result: users,
    });
}
    
// get user only if the person is admin
exports.getUser = async (req, res) => {
    try {
        const { userId } = req.query;
        const loggedInUser = req.user
        let query = {_id:userId}
        if(!userId){
            delete query._id
            query.email=loggedInUser.email
        }
        const user = await User.findOne(query).select('email phone role');
        console.log(user)
        if (!user) return res.status(400).json({
            success: false,
            message: 'user is not exist'
        });
            res.status(200).json({
            result: user
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
}
    
// update the isAdmin == true
exports.updateUser = async (req, res) => {
    try {
        const { carDetails } = req.body
        if(!carDetails) return res.status(400).json({
            success:false,
            message: 'there is no details'
        })
        const user = req.user
        const updatedUser = await User.findOneAndUpdate(
            {email:user.email},
            { $set: { carDetails } },
            { new: true }
        );
        // console.log(res.locals.user)
        
        return res.status(200).json({
            success: true,
            message: 'carDetails has been updated!'
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
}

    
exports.deleteUser = async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.params.userId, {$set:{isDeleted:true}});
        return res.status(200).json({
            success: true,
            message: "User has been deleted."
        });
    } catch (err) {
        next(err);
    }
}

exports.defaultIsDeleted = async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.params.userId, {$set:{isDeleted:false}});
        return res.status(200).json({
            success: true,
            message: "User has been put on the false."
        });
    } catch (err) {
        next(err);
    }
}



