const followModel = require("../../model/follows");
const reg = require("../../model/register");
const { ObjectId } = require("mongodb");

exports.connectionGet = async (req, res) => {
  const senderId = req.user.id;

  try {
    const users = await reg.find({});
    const followers = await followModel.find({});
    const userData = users.map((user) => {
      if (
        followers.find(
          (el) =>
            el.senderId === senderId &&
            el.receiverId.toString() === user._id.toString()
        ) ||
        senderId.toString() === user._id.toString()
      )
        return null;
      else {
        return {
          receiverId: user._id,
          fullName: user.fullName,
          username: user.email,
          userProfile: user.userProfile,
          userAbout: user.userAbout,
          isFollowing: "follow",
        };
      }
    });

    const filteredUserData = userData.filter((user) => user !== null);

    res.json({ message: "success", status: true, data: filteredUserData });
  } catch (error) {
    console.error("Error retrieving users' data:", error);
    res.status(500).json({
      message: "Failed to retrieve users' data.",
      status: false,
    });
  }
};

exports.connectionMake = async (req, res) => {
  try {
    const followConnection = await followModel({
      senderId: req.user.id,
      receiverId: req.body.receiverId,
      isFollowing: "following",
    });
    await followConnection.save();
    res.json({ message: "success", status: true, data: [] });
  } catch (error) {
    console.error("Error in following the user:", error);
    res.status(500).json({
      message: "Error in following the user.",
      status: false,
    });
  }
};

exports.myNetworkGet = async (req, res) => {
  try {
    const users = await followModel
      .find({ senderId: req.user.id })
      .populate("receiverId");
    res.json({ message: "success", status: true, data: users });
  } catch (err) {
    console.error("Error in fetching the following user:", error);
    res.status(500).json({
      message: "Error in fetching the following user.",
      status: false,
    });
  }
};

exports.connectionBreak = async (req, res) => {
  try {
    console.log(req.body);
    await followModel.findOneAndDelete({
      senderId: req.user.id,
      receiverId: ObjectId(req.body.receiverId),
    });
    res.json({ message: "success", status: true, data: [] });
  } catch (error) {
    console.error("Error in unfollowing the user:", error);
    res.status(500).json({
      message: "Error in unfollowing the user.",
      status: false,
    });
  }
};
