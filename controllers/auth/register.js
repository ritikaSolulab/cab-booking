const bcrypt = require('bcryptjs');
const User = require('../../models/User')

exports.register = async(req,res) => {
    try{
        const { email, password, role, phone, carDetails } = req.body;
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        // checking if email is exist or not
        const emailExist = await User.findOne({email: email});
        if(emailExist) return res.status(400).json({
            success: false,
            message: 'Email already exists'
        });

        if(role === 'DRIVER' && !carDetails) return res.status(400).json({success: false,message:'car details are missing'})
            
            let userPayload = {
                    email: email,
                    role: role,
                    phone: phone,
                    password: hash
                }
                const userData = await User.create(userPayload)
                console.log(userData)
                

            // if(role === 'DRIVER'){
            //     userPayload = {
            //         carDetails: carDetails, ...userPayload
            //     }
            // }
            // console.log(userPayload)
        // if(bookingHistory){
        //     userPayload.bookingHistory = bookingHistory
        // }
        //create a new user
        //const user = new User(userPayload)

        //await user.save()
        return res.status(201).json({
            success: true,
            message: 'User has been created.'
        })
    }catch(err){
       res.status(400).json('Provide valid details')
    }
}