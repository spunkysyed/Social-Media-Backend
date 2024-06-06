import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config()

const url =process.env.DB_URL;
export const connectUsingMongoose = async () => {
    try {
      await mongoose.connect(`${url}SocialMedia`);
      console.log("MongoDB connected using mongoose");
    } catch (err) {
      console.log("Getting errror while connect mongoose");
      console.log(err);
    }
 };