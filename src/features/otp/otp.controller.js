import UserRepository from "../user/user.repository.js";
import OtpRepository from "./otp.repository.js";
import nodemailer from "nodemailer";
import bcrypt from 'bcrypt';

export default class OtpController {
  constructor() {
    this.otpRepository = new OtpRepository();
    this.userRepository = new UserRepository();
  }

  async sendOtp(req, res) {
    try {
      const { email } = req.body;
      const user = await this.userRepository.findUserByEmail(email);

      if (user) {
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const expiresIn = new Date(Date.now() + 600000);

        await this.otpRepository.send(user._id,email, otp, expiresIn);

        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD,
          },
        });

        const mailOptions = {
          from: process.env.EMAIL,
          to: email,
          subject: "OTP For Reseting The Passowrd",
          text: `OTP: ${otp}`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log(error);
            return res.status(400).send("Error Sending Otp");
          }
          res.status(200).send("OTP sent Successfully");
        });
      } else {
        res.staus(404).send("User not found. Please signup");
      }
    } catch (error) {
      console.log(error);
    }
  }

  async verifyOtp(req,res){
    const {otp,email}=req.body;
    const user=await this.userRepository.findUserByEmail(email);

    if(!user){
        res.status(404).send("User Not Found")
    }

    const found=await this.otpRepository.verify(otp,email);
    if(found){
        res.status(200).send("Otp Verified Successfully")
    }
    else{
        res.status(400).send("invalid Otp")
    }
  }

  async resetPassword(req,res){
    const {password,email,otp}=req.body;
    const user=await this.userRepository.findUserByEmail(email);

    if(!user){
        res.status(404).send("User not found!");
    }
    
    const verifyEmailHasOtp=await this.otpRepository.findOtp(user._id,email,otp)
    if(!verifyEmailHasOtp){
        res.status(400).send("Invalid Otp");
    }
    
    const hashedPassword=await bcrypt.hash(password,12);
    const updated=await this.userRepository.updatePassword(user._id,email,hashedPassword);

    if(updated){
        res.status(201).send("Password reset successfully")
    }
    else{
        res.status(400).send("Password Updation Unsuccessfull")
    }


  }

}
