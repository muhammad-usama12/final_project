import express from 'express';
import { getComments } from '../db/queries/comments.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const comments = await getComments();
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
