import { Schema, model } from "mongoose";

const productSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    discount:{
        type:Number
    },
    category: {
        type: String,
        required: true
    },
    subCategory: {
        type: String,
        required: true
    },
    brandName:{
        type: String
    },
    countryOfOrigin:{
        type:String
    },
    stockQuantity: {
        type: Number,
        required: true
    },
    images: [String],
    seller: {
        type: Schema.Types.ObjectId,
        ref: 'users', // Reference to the seller model
        required: true
    },
    visibility: {
        type: Boolean,
        default: true
    },
    featured: {
        type: Boolean,
        default: false
    },
    rating: {
        type: Number,
        default: 0
    },
    reviews: [{
        user: String,
        comment: String,
        rating: Number
    }],
},{
    timestamps:true
})

const products = model('products' , productSchema);

export default products;