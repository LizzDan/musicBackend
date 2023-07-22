const router = require("express").Router();
const posts = require("../models/post");

//create a post

router.post("/post", async (req, res) => {
  const newPost = new this.post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});
//update post
router.put("/update", async (req, res) => {
  try {
    const post = await posts.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.updateone({ $set: req.body });
      res.status(200).json("Post successfully Updated");
    } else {
      res.status(403).json("you can update only your post");
    }
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});
//delete a post
router.delete("/delete", async (req, res) => {
  try {
    const post = await post.findById(req.params.Id);
    if (post.userId === req.body.userId) {
      await post.deletOne();
      res.status(200).json("Post successfully deleted");
    } else {
      res.status(403).json("you can delete only your post");
    }
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});
//like a post
router.put("/:id/like", async (req, res) => {
  try {
    const post = await posts.findById(req.params.id);

    if (!post.likes.includes(req.body.userId)) {
      res.status(200).json({ msg: "post like" });
    } else {
      await posts.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json({ msg: "Post disliked" });
    }
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});
//get a post
router.get("/getA", async (req, res) => {
  try {
    const post = await this.post.findById(req.params.id);
    res.status(200).json("View Post");
  } catch (err) {
    res.status(500).json("Post not find");
    console.log(err);
  }
});
//get timeline posts
router.get("/timeline/all", async (req, res) => {
  // let postArray = [];
  try {
    const currentUser = await User.findById(req.body.userId);
    const userposts = await post.find({ userId: currentUser._id });
    const friendPosts = await Promise.all(
      currentUser.following.map((friendId) => {
        return post.find({ userId: friendId });
      })
    );
    res.json(userPost.concat(...friendPosts));
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
