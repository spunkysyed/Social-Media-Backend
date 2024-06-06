import ApplicationError from "../../Error-Handler/errorHandler.js";
import FriendRepository from "./friendship.repository.js";
export default class FriendController{
    constructor(){
        this.friendRepository=new FriendRepository();
    }
    
    async getAllUserFriends(req,res){
        const userId=req.params.userId;
        const friends=await this.friendRepository.getAllFriends(userId);
        if(friends){
            res.status(200).send(friends);
        }
        else{
            res.status(404).send("No Friends Found!")
        }
    }

    async getPendingRequests(req,res){
        const userId=req.userID;
        const friends=await this.friendRepository.getPendingFriends(userId);
        if(friends){
            res.status(200).send(friends)
        }
        else{
            res.status(404).send("No Requests are pending");
        }
    }

    async toggleRequest(req,res){
        const friendId=req.params.friendId;
        const userId=req.userID;
        const toggled=await this.friendRepository.toggle(userId,friendId)
        res.status(200).send(`${toggled} Successfully`)
    }
    
    async respondToRequest(req, res) {
        try {
          const userId = req.userID;
          const friendId = req.params.friendId;
          const { action } = req.body; 
          const result = await this.friendRepository.respond(userId, friendId, action);
          res.status(200).send(result);
        } catch (error) {
            console.log(error)
          throw new ApplicationError("Something Went Wrong!",500);
        }
      }
}