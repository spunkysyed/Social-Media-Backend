import ApplicationError from '../../Error-Handler/errorHandler.js';
import CommentModel from "./comment.schema.js";

export default class CommentRepository {
  async add(postId, userId, comment) {
    try {
      const newComment = new CommentModel({ postId, userId, comment });
      await newComment.save();
      return newComment;
    } catch (error) {
      console.log(error);
      throw new ApplicationError("Something went Wrong",500);
    }
  }

  async get(postId, userId) {
    try {
      const comments = await CommentModel.find({ postId, userId });
      return comments;
    } catch (error) {
      console.log(error);
      throw new ApplicationError("Something went Wrong",500);
    }
  }

  async delete(userId,commentId){
    try {
        await CommentModel.findOneAndDelete({_id:commentId,userId});
    } catch (error) {
        console.log(error)
        throw new ApplicationError("Something went Wrong",500);
    }
  }

  async update(userId,commentId,comment){
    try {
        await CommentModel.findOneAndUpdate({userId,_id:commentId},{
            $set:{
                comment:comment
            }
        });
    } catch (error) {
        console.log(error);
        throw new ApplicationError("Something went Wrong",500);
    }
  }
}
