import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config();


const connect= async ()=>{
    try{
        const connection= await mongoose.connect(`${process.env.url}/database`);
        console.log(`Connected to MongoDB || DB host: ${connection.connection.host}`);
    } catch (error) {
        console.error("MongoDB connection error", error);
        console.log(process.exit(1));
    }
};


// const MessageConnect=async()=>{
//     try{
//         const MessConnected=await mongoose.connect(`${process.env.url}/Message`);
//         console.log(`connected messaging database`);
//     }catch(error){
//         console.log(`connected to faild ${error}`)

//     }
// }

export {connect};