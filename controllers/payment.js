// require("dotenv").config();
// const express = require('express');
// const path = require('path');
// const stripes = require('stripe')(process.env.STRIPE_SECRET_KEY_AU);
// const Payment = require('../models/Payment');
// const YOUR_DOMAIN = "http://localhost:8080";
// const app = express();

// //midlewares 
// app.use(express.json())

// const stripe = require('stripe')('sk_test_51Mq9HfSEeZK5dkza2BEid6KLKXUMeIWJ8UBwrUca4BqxcH6yYUvqiiZaQDe55KGMS6ciWvtfVo2rsJPF2Pk0TEfy00J5UbPcFd');
// //views
// app.use(express.static(path.join(__dirname, "views")));
// // app.set('views', path.join(__dirname,'views'))
// // app.set('view engine', 'ejs')

// app.post("/payment", async (req, res) => {
//     const { product } = req.body;
//     const session = await stripe.checkout.sessions.create({
//         payment_method_types: ["card"],
//         line_items: [
//             {
//                 price_data: {
//                     currency: "inr",
//                     product_data: {
//                         name: product.name,
//                         images: [product.image],
//                     },
//                     unit_amount: product.amount * 100,
//                 },
//                 quantity: product.quantity,
//             },
//         ],
//         mode: "payment",
//         success_url: `${YOUR_DOMAIN}/success.html`,
//         cancel_url: `${YOUR_DOMAIN}/cancel.html`,
//     });

//     const payment = new Payment({
//         paymentId:session.id,
//         name: product.name,
//         amount: product.amount,
//         status: 'succeeded'
//     })

//     await payment.save();
//     res.json({ id: session.id });
//     console.log('session.id',session.id)
// });

//module.exports = session



