import { Router } from 'express';
import { postControllers } from '../controllers/postControllers.js';
const router = Router();

// Get all posts
router.get("/", postControllers.getPosts);

// Get a single post by ID
router.get("/:id", postControllers.getPostById);

// Create a new post
router.post("/", postControllers.createPost);

// update a post 
router.put("/:id", postControllers.updatePost);

// Delete a post
router.delete("/:id", postControllers.deletePost);

export default router;