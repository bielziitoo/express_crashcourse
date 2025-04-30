import { Router } from 'express';
const router = Router();

let posts = [
    { id: 1, title: "Post 1", content: "This is the first post." },
    { id: 2, title: "Post 2", content: "This is the second post." },
    { id: 3, title: "Post 3", content: "This is the third post." },
];

// Get all posts
router.get("/", (req, res) => {
    const limit = parseInt(req.query.limit, 10);
    if (!isNaN(limit) && limit > 0) {
        res.status(200).json(posts.slice(0, limit));
        return;
    }
    res.status(200).json(posts);
});

// Get a single post by ID
router.get("/:id", (req, res) => {
    const postId = parseInt(req.params.id, 10);
    const post = posts.find(p => p.id === postId);
    if (post) {
        res.status(200).json(post);
        return;
    }
    res.status(404).json({ message: `Post with the id of ${postId} was not found` });
});

// Create a new post
router.post("/", (req, res) => {
    const newPost = {
        id: posts.length + 1,
        title: req.body.title,
        content: req.body.content,
    };

    if (!newPost.title || !newPost.content) {
        return res.status(400).json({ message: "Title and content are required." });
    }

    posts.push(newPost);
    res.status(201).json(posts);
});

// update a post 
router.put("/:id", (req, res) => {
    const postId = parseInt(req.params.id, 10);
    const post = posts.find(p => p.id === postId);

    if (!post) {
        return res.status(404).json({ message: `Post with the id of ${postId} was not found` });
    }

    post.title = req.body.title;
    post.content = req.body.content;

    if (!post.title || !post.content) {
        return res.status(400).json({ message: "Title and content are required." });
    }
    res.status(200).json(posts);
});

// Delete a post
router.delete("/:id", (req, res) => {
    const postId = parseInt(req.params.id, 10);
    const post = posts.find(p => p.id === postId);

    if (!post) {
        return res.status(404).json({ message: `Post with the id of ${postId} was not found` });
    }

    posts.splice(postId - 1, 1);
    res.status(200).json(posts);
});

export default router;