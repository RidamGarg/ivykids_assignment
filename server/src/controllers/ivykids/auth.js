const reg = require("../../model/register");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const profileAvatars = require("./avatar");

exports.ivyRegistration = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required", status: false });
    }
    const existingUser = await reg.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ message: "Username already exists", status: false });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;

    const randomIndex = Math.floor(Math.random() * profileAvatars.length);
    const randomImage = profileAvatars[randomIndex];
    req.body.userProfile = "https://api.multigrad.in/avatars/" + randomImage;

    const newUser = new reg(req.body);
    const user = await newUser.save();
    const payload = {
      user: {
        id: user._id,
        email: user.email,
      },
    };
    const userToken = jwt.sign(
      payload,
      process.env.JWT_SECRET || "fghgghgvbnmnbm"
    );

    res.json({ status: true, userToken });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error", status: false });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const user = await reg.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found", status: false });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Invalid Password", status: false });
    }
    const payload = {
      user: {
        id: user._id,
        email: user.email,
        campusCode: user.campusCode,
        classOrCourse: user.classOrCourse,
        roadMapName: user.roadMapName,
      },
    };
    const userToken = jwt.sign(
      payload,
      process.env.JWT_SECRET || "fghgghgvbnmnbm"
    );
    res.json({ status: true, userToken });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal server error" });
  }
};
