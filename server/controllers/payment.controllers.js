import stripe from 'stripe';
const stripeInstance = stripe(process.env.stripe_key);

export const stripePayment = async(req , res) => {
try{   
    const {products} = req.body;
   const lineItems = products.map((product) => ({
    price_data:{
        currency:"inr",
        product_data:{
            name: product.productName
        },
        unit_amount:product.productPrice*100,
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