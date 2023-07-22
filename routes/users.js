const router = require("express").Router();
const { User } = require("../models/Users");

//update
router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (err) {
        return res.status(500).json(err);
      }
      try {
        const user = await User.findByIdAnUpdate(req.params.id, {
          $set: req.body,
        });
        res.status(200).json("Account has been Successfully Updated");
      } catch (err) {
        return res.status(500).json(err);
      }
    } else {
      return res.status(403).json("You can update only your account!");
    }
  } else {
    return res.status(403).json("Invalid Details!");
  }
});
//delete user
router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    if (req.body.password) {
      try {
        const user = await User.findByIdAndDelete(req.params.id);
        res.status(200).json("Account has been Successfully deleted");
      } catch (err) {
        console.log(err);
        return res.status(500).json(err);
      }
    } else {
      return res.status(403).json("You can update only your account!");
    }
  } else {
    return res.status(403).json("You can delete your account!");
  }
});
//get a user
router.get("/user/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, updateAt, ...other } = user._doc;
    res.status(200).json("Successful");
  } catch (err) {
    res.status(500).json(err);
  }
});
// follow a user
router.put("/follow/:id", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      console.log(user);
      if (!user.followers.includes(req.body.useId)) {
        await user.updateOne({ $push: { followers: req.body.userId } });
        await User.updateOne({ $push: { followings: req.params.id } });
        res.status(200).json("User has been followed");
      } else {
        res.status(403).json("You are already follow this user");
      }
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You cant follow yourself");
  }
});
// unfollow a user
router.put("/unfollow/:id", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      // const currentUser = await user.findById(re.body.userId);
      if (user.followers.includes(req.body.useId)) {
        await user.updateOne({ $pull: { followers: req.body.userId } });
        await User.updateOne({ $pull: { followings: req.params.Id } });
        res.status(200).json("User has been unfollowed");
      } else {
        res.status(403).json("User Unfollow");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You cant unfollow yourself");
  }
});

router.get("/", (req, res) => {
  res.send("Users router");
});

module.exports = router;
