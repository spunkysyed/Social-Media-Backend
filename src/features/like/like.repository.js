import ApplicationError from "../../Error-Handler/errorHandler.js";
import LikeModel from "./like.schema.js";


export default class LikeRepository {
  async get(id, type) {
    try {
      const likes = await LikeModel.find({ likeable: id, on_model: type }).populate({path:'userId',select:'-password -tokens'}).populate({path:'likeable'});
      return likes;
    } catch (error) {
      console.log(error);
      throw new ApplicationError("Something went Wrong",500);
    }
  }

  async toggle(id, userId, type) {
    try {
      const like = await LikeModel.findOne({
        userId,
        likeable: id,
        on_model: type,
      });
      if (like) {
        await LikeModel.deleteOne({ _id: like._id });
        return "Like removed";
      } else {
        const newLike = new LikeModel({
          userId,
          likeable: id,
          on_model: type,
        });
        await newLike.save();
        return "Like Added";
      }
    } catch (error) {
      console.log(error);
      throw new ApplicationError("Something went Wrong",500);
    }
  }
}
