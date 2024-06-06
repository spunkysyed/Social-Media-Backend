import express from 'express';
import FriendController from './friendship.controller.js';

const FriendRouter =express.Router();

const friendController=new FriendController();

FriendRouter.get('/get-friends/:userId',(req,res)=>{
    friendController.getAllUserFriends(req,res);
})

FriendRouter.get('/get-pending-requests',(req,res)=>{
    friendController.getPendingRequests(req,res);
})

FriendRouter.post('/toggle-friendship/:friendId',(req,res)=>{
    friendController.toggleRequest(req,res);
})

FriendRouter.post('/response-to-request/:friendId',(req, res) => {
    friendController.respondToRequest(req, res)
});

export default FriendRouter;