import PostRepository from "./post.repository.js";


export default class PostController{
    constructor(){
        this.postRepository=new PostRepository();
    }

    async getAllPost(req,res){
        const posts=await this.postRepository.getPost();
        res.status(200).send(posts);
    }

    async createPost(req,res){
        const userId=req.userID
        const {caption}=req.body
        const imageUrl=req.file.filename;
        const postCreated=await this.postRepository.create(userId,caption,imageUrl);
        res.status(201).send("Post Created Successfully");
    }

    async getPostById(req,res){
        const postId=req.params.postId;
        const post=await this.postRepository.getSpecificPost(postId);
        if(post){
            res.status(200).send(post);
        }
        else{
            res.status(404).send("Post Not Found")
        }
    }

    async getPostsOfUser(req,res){
        const userId=req.userID;
        const posts=await this.postRepository.getPostsByUser(userId);
        if(posts){
            res.status(200).send(posts)
        }
        else{
            res.status(400).send("No Post Found")
        }
    }

    async deletePost(req,res){
        const postId=req.params.postId;
        const userId=req.userID
        await this.postRepository.delete(postId,userId);
        res.status(200).send("Post Deleted")
    }

    async updatePost(req,res){
        const userId=req.userID;
        const postId=req.params.postId;
        const {caption}=req.body;
        const imageUrl=req.file.filename;
        const updatedPost=await this.postRepository.update(postId,userId,caption,imageUrl)
        if(updatedPost){
            res.status(201).send("Post Updated Successfully")
        }else{
            res.status(400).send("Post Not Updated!")
        }
    }

}