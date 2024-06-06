import ApplicationError from '../../Error-Handler/errorHandler.js'
import OtpModel from "./otp.schema.js";


export default class OtpRepository {
  async send(userId, email, otp, expiresIn) {
    try {
      const otpFound=await OtpModel.findOne({userId,email})

      if(otpFound){
        await OtpModel.deleteMany({userId,email});
      }

      const newOtp = new OtpModel({
        userId,
        email,
        otp,
        expiresIn,
      });
      await newOtp.save();
    } catch (error) {
      console.log(error);
      throw new ApplicationError("Something went Wrong",500)
    }
  }

  async verify(otp, email) {
    try {
      const otpFound = await OtpModel.findOne({ email, otp });
      if (otpFound) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
      throw new ApplicationError("Something went Wrong",500)
    }
  }

  async findOtp(userId,email,otp){
    try {
        const otpFound=await OtpModel.findOne({userId,email,otp});
        if(otpFound){
            return true;
        }
        else{
            return false;
        }
    } catch (error) {
        console.log(error);
        throw new ApplicationError("Something went Wrong",500)
    }
  }
}
