import { Schema, model } from "mongoose";
import jwt from "jsonwebtoken";

const cartItemSchema = new Schema({
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'products'
    },
    productName: String,
    productCount: {
        type: Number,
        default: 1 
    },
    productPrice:{
        type: Number,
    }
});

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['seller', 'customer'],
        default: 'customer'
    },
    address:{
        type: String
    },
    cart: [cartItemSchema] 
},{
    timestamps: true
});

userSchema.methods = {
    generateTokens: function(){
        const payload = {
            userId: this._id,
            userRole: this.role,
            userName:this.username
        };
        const accessToken = jwt.sign(payload, process.env.Jwt_Secret, { expiresIn: process.env.Jwt_Access_expiry });
        const refreshToken = jwt.sign(payload, process.env.Jwt_Secret, { expiresIn: process.env.Jwt_Refresh_expiry });        

        return {accessToken , refreshToken};
    }
};

const User = model('User', userSchema);

export default User;
