import mongoose from 'mongoose'


const UserSchema=new mongoose.Schema({

    name:{
        type:String,
        required:true,

    },
    email:{
        type:String,
        required:true,
        unique:unique,
        
    },
    password:{
        type:String,
        required:[true,'password is required bruhh!!!']
    }


    
});


export const Users=mongoose.model("User",UserSchema);