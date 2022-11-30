import express from "express";
import { getPosts, addPost, addLike } from "../db/queries/posts.js";

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

  try {
    const post = await addPost(req.body);
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.put('/:id/like', async (req, res) => {

  const id = req.params.id;

  try {
    const likes = await addLike(id);
    res.json(likes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
 })


 export default router;
