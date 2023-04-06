const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true
        },
        carDetails: { 
            name: {type:String, required: true},
            color: {type: String, required: true},
            carNumber:{type: String, required: true}
        },
        phone: {
            type: Number,
            required: true
        },
        role: {
            type: String,
            default: 'user',
            enum: ['ADMIN', 'DRIVER', 'USER']
        },
        bookingHistory: [
            {
                type: mongoose.Schema.ObjectId,
                ref: 'User'
            }
        ],
        isDeleted: {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
