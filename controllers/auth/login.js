const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');

exports.login = async(req,res) => {
    try{
        const {email,password} = req.body

        //checking if email exists
        const user = await User.findOne({email: email})
        if(!user) return res.status(400).json({
            success: false,
            message: 'Email or password is wrong'
        })

        // checking if password is correct or not
        const validPass = await bcrypt.compare(password, user.password)
        if(!validPass) return res.status(400).json({
            success: false,
            message: 'Invalid password'
        });

            if(user.isDeleted){
                return res.status(400).json({success: false,message:'This user has been deleted'})
            }

        //create and assign token
        const token = jwt.sign({id:user._id}, process.env.JWT);

        return res.header("access_token", token).json({token:token});
    }catch(err){
        res.status(400).json({message: 'Provide valid details'})
    }
}

exports.resetPassword = async(req,res) => {
    try{
        const {oldPassword, newPassword} = req.body
        const id = req.user._id
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(newPassword, salt);

        const user = await User.findById(id)
        if(!user){
            return res.status(400).json({message:'User not available'})
        }

        if(user.isDeleted==true){
            return res.status(404).json({message:'user has been deleted'})
        }

        const passwordMatch = await bcrypt.compare(oldPassword, req.user.password);
        if(!passwordMatch){
            return res.status(401).json({
                success: false,
                message: 'Current password is incorrect'
            })
        }

        if(oldPassword === newPassword){
            return res.status(403).json({message:'passwords are same'})
        }
        
        await User.findByIdAndUpdate({_id:id},{password:hash})

        return res.status(200).json({message:'Password has been updated!'})
    }catch(err){
        console.log(err)
        res.status(400).json({message: 'Server Error'})
    }
}

exports.forgotPassword = async(req,res)=>{
    try{
        const {email, newPassword} = req.body
        //email = req.user.email
        if(email !== req.user.email) return res.status(400).json({message:'your email is incorrect'});
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(newPassword, salt);

        const user = await User.findOne({email:email})
        if(!user){
            return res.status(400).json({success:false, message:'User not available'})
        }

        if(user.isDeleted==true){
            return res.status(404).json({success:false, message:'user has been deleted'})
        }
        
        await User.findOneAndUpdate({email:email},{password:hash})

        return res.status(200).json({success:true, message:'Password has been changed!'})
    }catch(err){
        console.log(err)
        res.status(400).json({message: 'Server Error'})
    }
}