const { Router } = require("express");
const { User } = require("../models/Users");
const { posts } = require("../models/post");
const bcrypt = require("bcrypt");

const router = Router();
//Register
router.post("/register", async (req, res) => {
  try {
    //generate new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //create new user and return response
    const newUser = new User({
      userName: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ err });
    console.log(err);
  }
});

//login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    !user && res.status(404).json("User not Found");

    const validPassword = await bcrypt.compare(password, user.password);
    !validPassword && res.status(400).json("Authentication Error");

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

router.post("/createPost", async (req, res) => {
  // const newPost = new this.post(req.body);
  const { userId, desc, image, likes } = req.body;
  try {
    const newPost = new posts({
      userId,
      desc,
      image,
      likes,
      createdAt: new Date(),
    });

    const savedPost = await newPost.save();
    res.status(200).json({savedPost});
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
