import mongoose from "mongoose";

export const friendSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Users',
        required:true
    },
    friendId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Users',
        required:true
    },
    friendshipStatus:{
        type:String,
        enum:['pending','accepted','rejected'],
        default:'pending'
    }
})

const FriendModel = mongoose.model("Friendships", friendSchema);
export default FriendModel;