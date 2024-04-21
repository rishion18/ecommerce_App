import { Schema, model } from "mongoose";

const paymentSchema = new Schema({
    razorpay_order_id:{
        type: String,
        required: true
    },
    razorpay_payment_id:{
        type: String,
        required: true
    },
    razorpay_signature:{
        type: String,
        required: true
    }
},{
    timestamps: true
})

const payments = model('payments' , paymentSchema)

export default payments;