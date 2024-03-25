import express from 'express';
import { config } from 'dotenv';
import { connectToDB } from './dbConfig/dbConfig.js';
import userRoute from './routes/user.route.js'
import productRoute from './routes/product.route.js'
import cartRoute from './routes/cart.route.js'
import cors from 'cors';
config();

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/user' , userRoute);
app.use('/api/product' , productRoute);
app.use('/api/cart' , cartRoute);

app.use('*' , () => {
    console.log('page not find');
})

app.listen('3012' , async() => {
    await connectToDB();
    console.log(`listening at http://localhost:3012`);
})