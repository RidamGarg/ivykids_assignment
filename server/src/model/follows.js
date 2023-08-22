const express = require("express");
const mongoose = require("mongoose");

const follows = new mongoose.Schema({
  senderId: {
    type: String,
  },
  receiverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "reg",
  },
  isFollowing: {
    type: String,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
  updatedDate: {
    type: Date,
    default: Date.now,
  },
});

const follow = new mongoose.model("follow", follows);
module.exports = follow;
