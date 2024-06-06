import mongoose from "mongoose";

export const otpSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Users',
        required:true
    },
    email:{
        type:String,
        required:true
    },
    otp:{
        type:Number,
        required:true
    },
    expiresIn:{
        type:Date,
        requried:true
    }

})

const OtpModel = mongoose.model("Otps", otpSchema);
export default OtpModel;