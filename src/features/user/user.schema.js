import mongoose from 'mongoose';

export const userSchema=new mongoose.Schema({
    name:{
        type:String,
        maxLength:[25,"Name can't be greater than 25 characters"],
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String
    },
    gender:{
        type:String,
        enum:["Male","Female"]
    },
    tokens:[{
        type:String
    }]
})

const UserModel = mongoose.model("Users", userSchema);
export default UserModel;
