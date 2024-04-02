import express from 'express';
import { config } from 'dotenv';
import { connectToDB } from './dbConfig/dbConfig.js';
import userRoute from './routes/user.route.js'
import productRoute from './routes/product.route.js'
import cartRoute from './routes/cart.route.js'
import paymentRoute from './routes/payment.route.js'
import cors from 'cors';
config();

const app = express();

app.use(express.json());

const corsOptions = {
    origin: 'https://ecommerce-app-psi-roan.vercel.app/', 
};

app.use(cors(corsOptions));

app.use('/api/user' , userRoute);
app.use('/api/product' , productRoute);
app.use('/api/cart' , cartRoute);
app.use('/api/payment' , paymentRoute);

const PORT = process.env.PORT || 3012;

app.use('*' , () => {
    console.log('page not find');
})

app.listen(PORT , async() => {
    await connectToDB();
    console.log(`listening at ${PORT}`);
})