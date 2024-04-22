import stripe from 'stripe';
import Razorpay from 'razorpay'
import payments from '../models/payments.model.js';
import crypto from 'crypto'
import OrderLog from '../models/orderLog.model.js';
import { config } from 'dotenv';
config()

//************************************************* --- STRIPE PAYMENT BLOCK START --- ***********************************************************

var stripeInstance;
const initialiseInstance = () => {
  stripeInstance = stripe(process.env.STRIPE_SECRET);

}

export const stripePayment = async (req, res) => {
  initialiseInstance();

  try {
    const { products, userName, userId } = req.body;

    // Saving orderData in db with pending payment status
    const orderBody = {
      userId: userId,
      cart: products,
      paymentStatus: 'pending'
    };

    const createdOrder = await OrderLog.create(orderBody);

    let customer;

    if (createdOrder) {  // if order is created successfully  -> creating customer and passing orderId for future reference
      try {
         customer = await stripeInstance.customers.create({
          metadata: {
            userId: createdOrder.userId.toString(),
            orderId: createdOrder._id.toString()
          }
        });
        console.log('Customer created');
      } catch (error) {
        console.log({ 'Error occurred creating customer': error.message });
      }
    }

    const lineItems = products.map((product) => ({
      price_data: {
        currency: 'inr',
        product_data: {
          name: product.productName
        },
        unit_amount: parseInt(product.productPrice * 100),
      },
      quantity: product.productCount
    }));

    const session = await stripeInstance.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      customer: customer.id,
      billing_address_collection: 'required',
      success_url: 'https://ecommerce-app-psi-roan.vercel.app/success',
      cancel_url: 'http://localhost:3000/failure'
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error('Error creating Stripe Checkout session:', error);
    res.status(500).json({ error: 'Failed to create Stripe session.' });
  }
};


// webhook listening for payment completion and updating payment status in created order

export const stripeVerification = (request, response) => {
  console.log('Reached the webhook endpoint');
  console.log({'stripeInstance':stripeInstance.webhooks.constructEvent})

  const sig = request.headers['stripe-signature'];

  let event;
  console.log(process.env.ENDPOINT_SECRET)
  console.log({'body': request.body , 'sig': sig })

  try {
    event = stripeInstance.webhooks.constructEvent(request.body, sig, process.env.ENDPOINT_SECRET);

  } catch (err) {
    console.error('Webhook Error:', err.message);
    response.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  if (event && event.type) {

    switch (event.type) {
      case 'checkout.session.completed':
        console.log({'Checkout Session Completed': event.data.object});
        handleCheckoutCompleted(event.data.object);
        break;
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
      
      const orderId = customer.metadata.orderId;

      if (orderId) {
        try {
          const order = await OrderLog.findOne({_id: orderId});
      
          if (order) {
            order.paymentStatus = session.payment_status;
            order.transactionId = session.id;

            await order.save();
            console.log('Order updated successfully:', order);
          } else {
            console.log('Order not found');
          }
        } catch (error) {
          console.error('Error occurred while updating OrderLog:', error.message);
        }
      } else {
        console.log('Invalid session data');
      }
    } catch (error) {
      console.error('Error retrieving customer details:', error.message);
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