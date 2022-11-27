import express from 'express';
import { getPosts } from '../db/queries/posts.js';

const router = express.Router();

// create the routes for movies
// /api/movies
router.get('/', async (req, res) => {
  try {
    const posts = await getPosts();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
