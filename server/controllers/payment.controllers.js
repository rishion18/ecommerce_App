import stripe from 'stripe';
import Razorpay from 'razorpay'
const stripeInstance = stripe(process.env.stripe_key);
var instance = new Razorpay({ key_id:'rzp_test_ynRcdWmb5fyIlt', key_secret:'gAE5kZdwjNJEPRA0O1CxxVsC' })


export const stripePayment = async(req , res) => {
try{   
    const {products} = req.body;
   const lineItems = products.map((product) => ({
    price_data:{
        currency:"inr",
        product_data:{
            name: product.productName
        },
        unit_amount:parseInt(product.productPrice * 100),
    },
    quantity:product.productCount
   }))

   const session = await stripeInstance.checkout.sessions.create({
    payment_method_types:["card"],
    line_items:lineItems,
    mode: "payment",
    success_url:"http://localhost:3000/success",
    cancel_url:"http://localhost:3000/failure"
   });
   res.json({id:session.id})
}catch(error){
    console.error('Error creating Stripe Checkout session:', error);
    res.status(500).json({ error: 'Failed to create Stripe session.' });
}
}


export const razorPayPayment = async(req , res) => {
    const{amount} = req.body;
    console.log('arrived at razorpay api')
    try{

        const options = {
            amount: amount*100,
            currency: "INR",
            receipt: "dummy reciept",
        }

        const order = await instance.orders.create(options)

        if (!order) return res.status(500).send("Some error occured");

        res.json(order);
    }catch(error){
        res.status(500).send(error);
    }

}