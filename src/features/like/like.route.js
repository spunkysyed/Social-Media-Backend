import express from 'express';

import LikeController from './like.controller.js';

const LikeRouter =express.Router();
const likeController =new LikeController();

LikeRouter.get('/:id',(req,res)=>{
    likeController.getLikes(req,res);
})

LikeRouter.post('/toggle/:id',(req,res)=>{
    likeController.toggleLike(req,res);
})




export default LikeRouter;