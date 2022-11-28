import express from 'express';
import { getPosts, addPosts } from '../db/queries/posts.js';

const router = express.Router();


router.get('/', async (req, res) => {
  try {
    const posts = await getPosts();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/new", async (req, res) => {

    try {
      const movie = await addPosts( req.body);
      res.json(movie);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
})

export default router;
