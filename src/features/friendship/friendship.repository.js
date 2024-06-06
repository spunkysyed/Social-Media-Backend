import ApplicationError from '../../Error-Handler/errorHandler.js'
import FriendModel from "./friendship.schema.js";

export default class FriendRepository {
  async getAllFriends(userId) {
    try {
      const friends = await FriendModel.find({ userId,friendshipStatus:'accepted' });
      console.log(friends)
      return friends;
    } catch (error) {
      console.log(error);
      throw new ApplicationError("Something went Wrong",500);
    }
  }

  async getPendingFriends(userId){
    try {
        const friends=await FriendModel.find({userId,friendshipStatus:'pending'});
        return friends
    } catch (error) {
        console.log(error)
        throw new ApplicationError("Something went Wrong",500);
    }
  }

  async toggle(userId,friendId){
    try {
        const friend=await FriendModel.findOne({userId,friendId});
    if(friend){
        await FriendModel.deleteOne({_id:friend._id})
        return "removed";
    }
    else{
        const newRequest= new FriendModel({
            userId,
            friendId,
        }) ;
        await newRequest.save();
        return 'Request Sended';
    }
    } catch (error) {
     console.log(error);   
     throw new ApplicationError("Something went Wrong",500);
    }
  }
  
  async respond(userId, friendId, action) {
    try {
      const request = await FriendModel.findOne({
        userId,
        friendId,
        friendshipStatus: 'pending'
      });

      if (!request) {
        throw new ApplicationError("No Firends Request Found",404)
      }

      request.friendshipStatus = action === 'accept' ? 'accepted' : 'rejected';
      await request.save();

      return "accepted";
    } catch (error) {
      console.log(error);
      throw new ApplicationError("Something went Wrong",500);
    }
  }

}
