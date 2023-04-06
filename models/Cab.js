const mongoose = require('mongoose');

const cabSchema = new mongoose.Schema(
{

    driverEmail:{
        type:String,
        ref: 'User'
    },
    driverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        //required: true
    },

    pickUpFrom: {type:String,required:true},
        // address: {
        //     type: String,
        //     required: true
        // },

        // latitude: {
        //     type: Number 
        // },

        // longitude: {
        //     type: Number  
        // },
    //},

    dropoffTo: {type:String,required:true},
        // address: {
        //     type: String,
        //     required: true,
        // },

        // latitude: {
        //     type: Number,    
        // },

        // longitude: {
        //     type: Number,    
        // },
    //},

    statusTransition:{
        type:{type:String} ,
        coordinates:[]
    },

    charge: {
        type: Number,
        //required: true,
    },

    bookingStatus: {
        type: String,
        default: "unavailable"
    },
    carDetails: { 
        type: String,
        ref: 'User'
    },
    isDeleted: {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true }
);

cabSchema.index({statusTransition: "2dsp"})
module.exports = mongoose.model('Cab', cabSchema);
