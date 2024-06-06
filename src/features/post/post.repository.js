import ApplicationError from "../../Error-Handler/errorHandler.js";
import PostModel from "./post.schema.js";


export default class PostRepository {
  async getPost() {
    try {
      const allPosts = await PostModel.find({});
      return allPosts;
    } catch (error) {
      console.log(error);
      throw new ApplicationError("Something went Wrong",500)
    }
  }

  async create(userId, caption, imageURL) {
    try {
      const newPost = new PostModel({ userId, caption, imageURL });
      await newPost.save();
      return newPost;
    } catch (error) {
      console.log(error);
      throw new ApplicationError("Something went Wrong",500)
    }
  }

  async getSpecificPost(postId) {
    try {
      const post = await PostModel.findById(postId);
      return post;
    } catch (error) {
      console.log(error);
      throw new ApplicationError("Something went Wrong",500)
    }
  }

  async getPostsByUser(userId) {
    try {
      const posts = await PostModel.find({ userId });
      return posts;
    } catch (error) {
      console.log(error);
      throw new ApplicationError("Something went Wrong",500)
    }
  }

  async delete(postId,userId) {
    try {
      const deletedPost = await PostModel.findOneAndDelete({ _id: postId ,userId});
      return deletedPost;
    } catch (error) {
      console.log(error);
      throw new ApplicationError("Something went Wrong",500)
    }
  }

  async update(postId,userId,caption,imageUrl){
    try {

        const updatedPost=await PostModel.findOneAndUpdate({_id:postId,userId},{
            $set:{
                 caption:caption,
                 imageURL:imageUrl
            }
        })

        return updatedPost
    } catch (error) {
        console.log(error)
        throw new ApplicationError("Something went Wrong",500)
    }
  }
}
