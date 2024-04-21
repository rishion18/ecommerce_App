import express from 'express';
import { config } from 'dotenv';
import { connectToDB } from './dbConfig/dbConfig.js';
import userRoute from './routes/user.route.js'
import productRoute from './routes/product.route.js'
import cartRoute from './routes/cart.route.js'
import paymentRoute from './routes/payment.route.js'
import razorPayRoute from './routes/razorPay.route.js'
import sortedBy from './routes/sorting.routes.js'
import cors from 'cors';
import { stripeVerification } from './controllers/payment.controllers.js';
config();

const app = express();

app.post('/webhook', express.raw({type: 'application/json'}) , stripeVerification)

app.use(express.json());


app.use(cors());

app.use('/api/user' , userRoute);
app.use('/api/product' , productRoute);
app.use('/api/cart' , cartRoute);
app.use('/api/payment' , paymentRoute);
app.use('/api/razorPay' , razorPayRoute)
app.use('/api/sortedBy' , sortedBy)

const PORT = process.env.PORT || 3012;

app.use('*' , () => {
    console.log('page not find');
})

app.listen(PORT , async() => {
    await connectToDB();
    console.log(`listening at ${PORT}`);
})