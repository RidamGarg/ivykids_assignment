const reg = require("../../model/register");
const post = require("../../model/post");
const followModel = require("../../model/follows");

exports.userAndPost = async (req, res) => {
  const userId = req.user.id;
  try {
    const followingUsers = await followModel.find({
      senderId: userId,
      isFollowing: "following",
    });
    const followingUserIds = followingUsers.map((follow) => follow.receiverId);
    followingUserIds.push(req.user.id);

    const postDetails = await post
      .find({
        $and: [
          {
            $or: [{ userId: { $in: followingUserIds } }],
          },
        ],
      })
      .sort({ _id: -1 });

    const userIds = postDetails.map((post) => post.userId);
    const userDetails = await reg.find({ _id: { $in: userIds } });
    const combinedData = postDetails.map((post) => {
      const user = userDetails.find(
        (user) => user._id.toString() === post.userId.toString()
      );

      return {
        _id: post._id,
        userId: post.userId,
        postImage: post.postImage,
        postQuestion: post.postQuestion,
        postPrivacy: post.postPrivacy,
        upvotes: post.upvotes.length,
        downvotes: post.downvotes.length,
        fullName: user ? user.fullName : "",
        userProfile: user ? user.userProfile : "",
        username: user ? user.email : "",
      };
    });
    res.status(200).json({
      message: "success",
      status: true,
      data: combinedData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
