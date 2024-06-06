import express from 'express';
import OtpController from './otp.controller.js';

const OtpRouter=express.Router();
const otpController=new OtpController();

OtpRouter.post('/send',(req,res)=>{
    otpController.sendOtp(req,res);
})

OtpRouter.post('/verify',(req,res)=>{
    otpController.verifyOtp(req,res);
})

OtpRouter.post('/reset-password',(req,res)=>{
    otpController.resetPassword(req,res);
})




export default OtpRouter