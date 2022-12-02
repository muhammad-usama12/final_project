import express from "express";
import { getPosts, addPost, addLike, deletePost } from "../db/queries/posts.js";

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
  const userId = req.params.id
  try {
    const post = await addPost(userId,req.body);
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

router.delete('/:id', async (req, res) => {

  const id = req.params.id;

  try {
    const post = await deletePost(id);
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
})



 export default router;
