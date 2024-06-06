import CommentRepository from "./comment.repository.js";

export default class CommentController {
  constructor() {
    this.commentRepository = new CommentRepository();
  }

  async addComment(req, res) {
    const userId = req.userID;
    const postId = req.params.postId;
    const { comment } = req.body;
    const addedComment = await this.commentRepository.add(
      postId,
      userId,
      comment
    );
    res.status(201).send("Comment Added:" + addedComment);
  }

  async getComment(req, res) {
    const userId = req.userID;
    const postId = req.params.postId;
    const comments = await this.commentRepository.get(postId, userId);
    if (comments) {
      res.status(200).send(comments);
    } else {
      res.status(400).send("Comments Not Found!");
    }
  }

  async deleteComment(req, res) {
    const commentId = req.params.commentId;
    const userId = req.userID;
    await this.commentRepository.delete(userId, commentId);
    res.status(200).send("Comment Deleted!");
  }

  async updateComment(req, res) {
    try {
      const commentId = req.params.commentId;
      const userId = req.userID;
      const {comment}=req.body
      await this.commentRepository.update(
        userId,
        commentId,
        comment
      );
      res.status(200).send("Comment Updated")
    } catch (error) {
      console.log(error);
    }
  }
}
