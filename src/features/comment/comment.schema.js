import mongoose from "mongoose";

export const commentSchema=new mongoose.Schema({
    postId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Posts',
        required:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Users',
        required:true
    },
    comment:{
        type:String,
        required:true
    }
})

const CommentModel = mongoose.model("Comments", commentSchema);
export default CommentModel;