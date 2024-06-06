import LikeRepository from "./like.repository.js";

export default class LikeController{

    constructor(){
        this.likeRepository=new LikeRepository();
    }

    async getLikes(req,res){
        const Id=req.params.id;
        const {type}=req.query;
        const likes=await this.likeRepository.get(Id,type);
        if(likes){
            res.status(200).send(likes)
        }else{
            res.status(404).send("Likes Not Found!");
        }
    }

    async toggleLike(req,res){
        const Id=req.params.id;
        const userId=req.userID;
        const {type}=req.query
        const toggleLike=await this.likeRepository.toggle(Id,userId,type);
        res.status(200).send(`${toggleLike} Like Successfully`);
    }
}