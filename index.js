const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require('path');
//const Payment = require('../../../Payment')


// import routes
const router = require('./routes/index');

const app = express();
dotenv.config();

//midlewares 
app.use(express.json())

//route middleware
app.use('/', router);


// intializing the port
const port = process.env.PORT || 8000;
const YOUR_DOMAIN = "http://localhost:8080";

// mongodb connection
const connect = async() => {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to mongoDB");
    } catch(error){
        throw error;
    }
}

const stripe = require('stripe')('sk_test_51Mq9HfSEeZK5dkza2BEid6KLKXUMeIWJ8UBwrUca4BqxcH6yYUvqiiZaQDe55KGMS6ciWvtfVo2rsJPF2Pk0TEfy00J5UbPcFd');
//views
app.use(express.static(path.join(__dirname, "views")));
// app.set('views', path.join(__dirname,'views'))
// app.set('view engine', 'ejs')

app.post("/payment", async (req, res) => {
    const { product } = req.body;
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
            {
                price_data: {
                    currency: "inr",
                    product_data: {
                        name: product.name,
                        images: [product.image],
                    },
                    unit_amount: product.amount * 100,
                },
                quantity: product.quantity,
            },
        ],
        mode: "payment",
        success_url: `${YOUR_DOMAIN}/success.html`,
        cancel_url: `${YOUR_DOMAIN}/cancel.html`,
    });

    const payment = new Payment({
        paymentId:session.id,
        name: product.name,
        amount: product.amount,
        status: 'succeeded'
    })

    await payment.save();
    res.json({ id: session.id });
    console.log('session.id',session.id)
});


// app.get('/', function(req,res){
//     res.render('Home', {
//         key: process.env.STRIPE_PUBLISHABLE_KEY_MY
//     })
// })

// listening on port 8080
app.listen(port, () => {
    connect()
    console.log(`Connected to the server: ${port}`);
})