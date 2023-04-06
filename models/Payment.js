const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            required: true,
        },
        amount: {
            type:Number
        },
        currency: {
            type:String
        },
        isDeleted: {
            type: Boolean,
            default: false
        }
        // cardDetails: {
        // 	cardName: {type:String,required:true},
        // 	cardNumber: {type:Number,required:true},
        // 	exp_month: {type:Number,required:true},
        // 	exp_year: {type:Number,required:true},
        // 	cvv: {type:Number,required:true},
        // },
    },

    { timestamps: true }
);

module.exports = mongoose.model('Payment', paymentSchema);
