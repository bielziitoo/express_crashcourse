
let posts = [
    { id: 1, title: "Post 1", content: "This is the first post." },
    { id: 2, title: "Post 2", content: "This is the second post." },
    { id: 3, title: "Post 3", content: "This is the third post." },
];

// @desc Get all posts
// @route GET /api/posts
const getPosts = ("/", (req, res) => {
    const limit = parseInt(req.query.limit, 10);
    if (!isNaN(limit) && limit > 0) {
        res.status(200).json(posts.slice(0, limit));
        return;
    }
    res.status(200).json(posts);
});

// @desc Get a single post by ID
// @route GET /api/posts/:id
const getPostById = ("/:id", (req, res, next) => {
    const postId = parseInt(req.params.id, 10);
    const post = posts.find(p => p.id === postId);

    if (!post) {
        const error = new Error(`Post with the id of ${postId} was not found`);
        error.status = 404;
        return next(error);
    }
    res.status(200).json(post);
});

// @desc Create a new post
// @route POST /api/posts
const createPost = ("/", (req, res, next) => {
    const newPost = {
        id: posts.length + 1,
        title: req.body.title,
        content: req.body.content,
    };

    if (!newPost.title || !newPost.content) {
        const error = new Error(`Title and content are required.`);
        error.status = 400;
        return next(error);
    }

    posts.push(newPost);
    res.status(201).json(posts);
});

// @desc Update a post
// @route PUT /api/posts/:id
const updatePost = ("/:id", (req, res) => {
    const postId = parseInt(req.params.id, 10);
    const post = posts.find(p => p.id === postId);

    if (!post) {
        return res.status(404).json({ message: `Post with the id of ${postId} was not found` });
    }

    post.title = req.body.title;
    post.content = req.body.content;

    if (!post.title || !post.content) {
        const error = new Error(`Title and content are required.`);
        error.status = 400;
        return next(error);
    }
    res.status(200).json(posts);
});

// @desc Delete a post
// @route DELETE /api/posts/:id
const deletePost = ("/:id", (req, res) => {
    const postId = parseInt(req.params.id, 10);
    const post = posts.find(p => p.id === postId);

    if (!post) {
        const error = new Error(`Post with the id of ${postId} was not found`);
        error.status = 400;
        return next(error);
    }

    posts.splice(postId - 1, 1);
    res.status(200).json(posts);
});

export const postControllers = {
    getPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost
}