const express = require("express");
const post = require("../../model/post");
const app = express();

exports.createUGC = async (req, res) => {
  try {
    if (!req.files["postImage"]) {
      var postImage = null;
    } else {
      postImage = req.files["postImage"][0].path;
    }
    const createPost = new post({
      userId: req.user.id,
      fullName: req.user.fullName,
      userProfile: req.user.userProfile,
      postDescription: req.body.postDescription,
      postImage: postImage,
      postPrivacy: req.body.postPrivacy,
      postQuestion: req.body.postQuestion,
      postAnswer: req.body.postAnswer,
      postLink: req.body.postLink,
      createdAt: post.createdDate,
    });
    createPost.save();
    res.send({
      message: "Post created successfully",
      status: true,
      createPost,
    });
  } catch {
    res.send({ message: "falied", status: 201 });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const postId = req.params.postId;
    const deletedPost = await post.findByIdAndDelete(postId);
    if (!deletedPost) {
      return res.status(404).json({ error: "Post not found" });
    }
    return res.json({ message: "Post deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const postId = req.params.postId;
    const text = req.body.postQuestion;
    const updatedPost = await post.findByIdAndUpdate(postId, {
      postQuestion: text,
    });
    if (!updatedPost) {
      return res.status(404).json({ error: "Post not found" });
    }
    return res.json({ message: "Post updted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.vote = async (req, res) => {
  try {
    const userId = req.user.id;
    const { postId, upvote } = req.body;
    const userPost = await post.findById(postId);
    console.log(userPost);
    if (upvote) {
      postUpvotes = userPost.upvotes.filter((upvote) => upvote !== userId);
      postUpvotes.push(userId);
      console.log(postUpvotes);
      await post.findByIdAndUpdate(
        { _id: postId },
        { $set: { upvotes: postUpvotes }, $pull: { downvotes: userId } }
      );
      return res.json({ message: "Post voted successfully" });
    } else {
      postDownvotes = userPost.downvotes.filter(
        (downvote) => downvote !== userId
      );
      postDownvotes.push(userId);
      await post.findByIdAndUpdate(
        { _id: postId },
        { $set: { downvotes: postDownvotes }, $pull: { upvotes: userId } }
      );
      return res.json({ message: "Post voted successfully" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
