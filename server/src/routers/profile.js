const express = require("express");
const router = new express.Router();
const path = require("path");
const multer = require("multer");
const ivyPost = require("../controllers/ivykids/ugc");
const ivyHomefeed = require("../controllers/ivykids/homefeed");
const ivyConnection = require("../controllers/ivykids/connection");
const { cloudinary, storage } = require("../cloudinary");

const upload = multer({ storage });
const multiFile = upload.fields([{ name: "postImage", maxCount: 4 }]);

router.post("/ivy/post", multiFile, ivyPost.createUGC);
router.post("/ivy/post/vote", ivyPost.vote);
router.delete("/ivy/post/:postId", ivyPost.deletePost);
router.post("/ivy/post/:postId", ivyPost.updatePost);
router.get("/ivy/homefeed/posts", ivyHomefeed.userAndPost);
router.get("/ivy/connection", ivyConnection.connectionGet);
router.get("/ivy/mynetworks", ivyConnection.myNetworkGet);
router.post("/ivy/following", ivyConnection.connectionMake);
router.post("/ivy/unfollow", ivyConnection.connectionBreak);

module.exports = router;
