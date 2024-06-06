import express from 'express';
import CommentController from './comment.controller.js';

const CommentRouter=express.Router();

const commentController=new CommentController();

CommentRouter.post('/:postId',(req,res)=>{
    commentController.addComment(req,res);
})

CommentRouter.get('/:postId',(req,res)=>{
    commentController.getComment(req,res);
})

CommentRouter.delete('/:commentId',(req,res)=>{
    commentController.deleteComment(req,res);
})

CommentRouter.put('/:commentId',(req,res)=>{
    commentController.updateComment(req,res);
})
export default CommentRouter;