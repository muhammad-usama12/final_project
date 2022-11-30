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

<<<<<<< HEAD
router.post("/new", async (req, res) => {
console.log("re.body", req.body)
    try {
      const post = await addPost(req.body);
      res.json(post);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
})
=======
router.post("/:id/new", async (req, res) => {
  console.log(req.params.id);
  try {
    const post = await addPost(req.body);
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
>>>>>>> b591ee75157cbbb3e2741dad744cabb521c27257

export default router;
