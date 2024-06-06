import mongoose from "mongoose";

export const likeSchema=new mongoose.Schema({
   userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Users',
    required:true
   },
   likeable:{
    type:mongoose.Schema.Types.ObjectId,
    refPath:'on_model',
    required:true
   },
   on_model:{
    type:String,
    enum:["Posts","Comments"]
   }

})
const LikeModel = mongoose.model("Likes", likeSchema);
export default LikeModel;