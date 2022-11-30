import express from "express";
import { getPosts, addPost } from "../db/queries/posts.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const posts = await getPosts();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/:id/new", async (req, res) => {
  console.log(req.params.id);
  try {
    const post = await addPost(req.body);
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
