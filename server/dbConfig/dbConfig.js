import mongoose from "mongoose";

export const connectToDB = async() => {
    const {connection} = await mongoose.connect(
        `mongodb+srv://kvkvraj83:${process.env.database_password}@cluster0.iszx2ts.mongodb.net/ecommerce?retryWrites=true&w=majority`
        );

    if(connection){
        console.log(`connected to database ${mongoose.connection.host}`)
    }
}