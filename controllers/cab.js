const nodemailer = require('nodemailer');
const axios = require('axios');
const Cab = require('../models/Cab');
const User = require('../models/User');

// //creating the cab
// exports.createBooking = async(req,res) => {
//     try{
//         const {pickUpFrom,dropoffTo,latitude,longitude} = req.body;
//         const userData = User.findOne({_id:res.locals.user});

//         if(userData){
//             if(!longitude || !latitude){
//                 res.status(400).json({
//                     message: 'lat and long is not found'
//                 });
//             } else {
//                 const userPayload = {
//                     pickUpFrom: pickUpFrom,
//                     dropoffTo: dropoffTo,
//                     statusTransition:{
//                         type:'Point',
//                         coordinates:[parseFloat(latitude),parseFloat(longitude)]
//                     }
//                 }

//                 //create a new user
//                 const user = new Cab(userPayload)
//                 await user.save()
//                 return res.status(201).json({
//                     success: true,
//                     message: 'Your booking has been created!'
//                 })
//             };
//         } else {
//             res.status(400).json({
//                 message: 'Cab is not found'
//             })
//         }
//     } catch (err) {
//         console.log(err.message);
//         res.status(500).send("Server Error");
//     }
// }

//Update the cab
exports.updateBooking = async(req,res) => {
    try{
        const { bookingStatus,driverEmail,latitude,longitude } = req.body
        const user = await Cab.findByIdAndUpdate(
            req.params.id,
            { $set: {bookingStatus, statusTransition:{coordinates:[parseFloat(latitude),parseFloat(longitude)]}} },
            { new: true }
        );
        if(user.bookingStatus === 'available'){
            const transporter = nodemailer.createTransport({
                host: 'smtp.ethereal.email',
                port: 587,
                auth: {
                    user: 'marcelina.keeling@ethereal.email',
                    pass: '7Z7hsp8BznazDpah7B'
                }
            });

            let message = {
                from: 'webster.farrell85@ethereal.email',
                to: driverEmail,
                subject: 'Booking status update',
                text: 'Your booking status is now available'
            }

            transporter.sendMail(message).then(()=>{
                return res.status(201).json({
                    success: true,
                    message: 'booking status has been updated and you have receive an email'
                });
            })
        } else {
            await Cab.findByIdAndUpdate(req.params.id,{$set:{bookingStatus}})
            return res.status(200).json({success:true,message:'booking status has been updated'})
        }
    }catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
}

//get single cab
exports.getNearByCab = async(req,res) => {
    try{
        const options = {
            statusTransition:{
                $geoWithin: {
                    $centerSphere: [[ -73.93414657, 40.82302903 ],5 / 3963.2 ] //make it dynamic
                }
            }
        }
        await Cab.find(options);
        return res.status(200).send(options);
    }catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
}

//deleting the cab
exports.deleteCab = async(req,res) => {
    try {
        await Cab.findByIdAndUpdate(req.params.id, {$set:{isDeleted:true}});
        return res.status(200).json({
          success: true,
          message: "cab has been deleted."
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
}

exports.getBookingHistory = async(req,res) => {
    try{
        const bookingHistory = await Cab.find(res.locals.user).select('bookingHistory');
        if (!bookingHistory) return res.status(400).json({
            success: false,
            message: 'This user doesn\'t have booking history'
        });
            res.status(200).json({
            result: bookingHistory
        });
    }catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
}

exports.addingCharge = async(req,res) => {
    try{
        const { driverId,bookingStatus,carDetails } = req.params
        const { charge }= req.body;

        const cabData = await Cab.findById(driverId)
        
        if(cabData.bookingStatus === 'available'){
            cabData.charge = charge,
            cabData.carDetails = carDetails
            await cabData.save()
            return res.status(201).json({
                success: true,
                message: 'Your cab has been created!'
            })
        }
        return res.status(400).json({
            success:false,
            message: 'Cannot created'
        })
    }catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
}

exports.getLocation = async(req,res,next) => {
    const { driverId } = req.query
    const {pickUpFrom, dropOffTo, statusTransition,latitude, longitude} = req.body;
    const pickupGeocode = await geocodeAddress(pickUpFrom)
    const dropoffGeocode = await geocodeAddress(dropOffTo)

    await Cab.findByIdAndUpdate(driverId,{
        statusTransition:{
            type: 'Point',
            coordinates: [latitude,longitude]
        }
    });
    // catch (err) {
    //     console.error(err.message);
    //     res.status(500).send("Server Error");
    // }
}


async function geocodeAddress(address){
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        address)}&key=${process.env.GEO_KEY}`

    const response = await axios.get(url)
    if(response.data.status === 'OK') {
        const result = response.data.results[0];
        console.log(result)
        return {
            latitude: result.geometry.location.lat,
            longitude: result.geometry.location.lng,
            address: result.formatted_address
        }
    } else {
        //return res.status(400).json({message:"wrong path"})
    }
}

// {
//   address_components: [
//     { long_name: 'Delhi', short_name: 'DL', types: [Array] },
//     {
//       long_name: 'Delhi Division',
//       short_name: 'Delhi Division',
//       types: [Array]
//     },
//     { long_name: 'India', short_name: 'IN', types: [Array] }
//   ],
//   formatted_address: 'Delhi, India',
//   geometry: {
//     bounds: { northeast: [Object], southwest: [Object] },
//     location: { lat: 28.7040592, lng: 77.10249019999999 },
//     location_type: 'APPROXIMATE',
//     viewport: { northeast: [Object], southwest: [Object] }
//   },
//   place_id: 'ChIJLbZ-NFv9DDkRQJY4FbcFcgM',
//   types: [ 'administrative_area_level_1', 'political' ]
// }

    // const { data } = response;
    // const location = data[latitude,longitude];
    // console.log(data)
    // console.log(location)
    // console.log(response)
    // // return location;
    // return{
    //     latitude: response.geometry,
    //     longitude: response.geometry,
    //     address: response.formatters_address,
    // }
    // return res.status(400).json({message:'wrong path'})