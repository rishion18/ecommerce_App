import stripe from 'stripe';
import Razorpay from 'razorpay'
import payments from '../models/payments.model.js';
import crypto from 'crypto'
import OrderLog from '../models/orderLog.model.js';

//************************************************* --- STRIPE PAYMENT BLOCK START --- ***********************************************************

var stripeInstance;
const initialiseInstance = () => {
  stripeInstance = stripe(process.env.STRIPE_SECRET);

}

export const stripePayment = async(req , res) => {

  initialiseInstance()

try{   
    const {products ,userName , userId} = req.body;  
    
    //saving orderData in db with pending payment status 

    const orderBody = {
      userId: userId,
      cart: products,
      paymentStatus: 'pending'
    };

    const createdOrder = await OrderLog.create(orderBody)
    
    if(createdOrder){
      try{
         await stripeInstance.customers.create({
          metadata:{
            userId: createdOrder.userId,
            orderId: createdOrder._id
          }
       })
       console.log('customer created')
       res.send('customer created')
      }catch(error){
        console.log({'error occured creating customer': error.message})
        res.send({'error occured creating customer': error.message})
      }
    }
    
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
    customer: customer.id,
    mode: "payment",
    billing_address_collection: 'required',
    success_url:"https://ecommerce-app-psi-roan.vercel.app/success",
    cancel_url:"http://localhost:3000/failure"
   });
   res.json({id:session.id})
}catch(error){
    console.error('Error creating Stripe Checkout session:', error);
    res.status(500).json({ error: 'Failed to create Stripe session.' });
}
}



export const stripeVerification = (request, response) => {
  console.log('Reached the webhook endpoint');

  const sig = request.headers['stripe-signature'];

  let event;

  try {
    event = stripeInstance.webhooks.constructEvent(request.body, sig, process.env.ENDPOINT_SECRET);

  } catch (err) {
    console.error('Webhook Error:', err.message);
    response.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  if (event && event.type) {

    switch (event.type) {
      case 'checkout.session.completed':
        console.log('Checkout Session Completed');
        handleCheckoutCompleted(event.data.object);
        break;
      // Handle other event types as needed
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
  } else {
    console.log('Invalid event received:', event);
  }
  response.send();
};

async function handleCheckoutCompleted(session) {
  if (session && session.customer && session.payment_status) {
    try {
      const customer = await stripeInstance.customers.retrieve(session.customer);
      console.log('Customer:', customer);
      
      // Parse the cart data from JSON string to an array of objects
      const orderId = customer.metadata.orderId
      // Construct the order body using the parsed cart data
      if (orderId) {
        try {
          const order = await OrderLog.findOne({ orderId: orderId });
      
          if (order) {
            order.paymentStatus = session.payment_status;
            order.transactionId = session.id;

            await order.save()
            console.log('Order updated successfully:', order);

          } else {
            console.log('Order not found');
          }
        } catch (error) {
          // Handle errors that occur during database query
          console.error('Error occurred while updating OrderLog:', error.message);
        }
      }
      

      const createdOrder = await OrderLog.create(orderBody);
      if (createdOrder) {
        console.log('Order created successfully:', createdOrder);
      } else {
        console.log('Error creating order');
      }
    } catch (error) {
      console.error('Error retrieving customer details or creating order:', error);
    }
  } else {
    console.log('Invalid session data');
  }
}
//************************************************* --- STRIPE PAYMENT BLOCK END --- *************************************************************


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


export const paymentVerification = async (req, res) => {

console.log(req.body)

  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.razorpay_secret)
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;

  if (isAuthentic) {
    // Database comes here

    await payments.create({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    });

    res.redirect(
      `http://localhost:3000/success?reference=${razorpay_payment_id}`
    );
  } else {
    res.status(400).json({
      success: false,
    });
  }
};