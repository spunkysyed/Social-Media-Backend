import express from "express";

import jwtAuth from '../../middlewares/jwt.middleware.js'
import {upload} from '../../middlewares/file-upload.middleware.js'

import PostController from "./post.controller.js";

const PostRouter=express.Router();
const postController=new PostController();

PostRouter.get('/all',(req,res)=>{
      postController.getAllPost(req,res);
})

PostRouter.get('/',(req,res)=>{
    postController.getPostsOfUser(req,res);
})

PostRouter.post('/',upload.single('imageUrl'),(req,res)=>{
    postController.createPost(req,res);
})

PostRouter.get('/:postId',(req,res)=>{
    postController.getPostById(req,res)
})

PostRouter.delete('/:postId',(req,res)=>{
    postController.deletePost(req,res);
})

PostRouter.put('/:postId',upload.single('imageUrl'),(req,res)=>{
    postController.updatePost(req,res);
})



export default PostRouter