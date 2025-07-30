import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config();

export async function connectDB() {
    try{
        await mongoose.connect(process.env.MONGOODB_URI).then(()=>{
            console.log('Database connected!')
        })
    }catch(error){
        console.log(error);
    }
}