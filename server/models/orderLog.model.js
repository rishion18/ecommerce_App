import { Schema, model } from "mongoose";

const orderLogSchema = new Schema({
    transactionId: {
      type: String,
      unique: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    cart: {
      type: [{
        productId: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        productName: {
          type: String,
          required: true,
        },
        productCount: {
          type: Number,
          required: true,
        },
        productPrice: {
          type: Number,
          required: true,
        },
      }],
      required: true,
    },
    paymentStatus: {
      type: String,
      default: 'pending',
    },
  } , {
   timestamps: true
  });

  const OrderLog = model('OrderLog' , orderLogSchema)

  export default OrderLog;