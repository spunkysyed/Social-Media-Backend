import mongoose from "mongoose";

export const postSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Users',
        required:true
    },
    caption:{
        type:String,
    },
    imageURL:{
        type:String,
        required:true
    }
})

const PostModel = mongoose.model("Posts", postSchema);
export default PostModel;