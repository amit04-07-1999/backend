const Post = require('../models/postModel');

exports.createPost = async (req, res) => {
    const { title, content } = req.body;
    const userId = req.userId;

    try {
        const newPost = new Post({ title, content, author: userId });
        await newPost.save();
        res.status(201).json({ message: 'Post created successfully', post: newPost });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.updatePost = async (req, res) => {
    const { title, content } = req.body;
    const postId = req.params.id;
    const userId = req.userId;

    try {
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        if (post.author.toString() !== userId) {
            return res.status(403).json({ error: 'Unauthorized' });
        }

        post.title = title;
        post.content = content;
        await post.save();

        res.json({ message: 'Post updated successfully', post });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deletePost = async (req, res) => {
    const postId = req.params.id;
    const userId = req.userId;

    try {
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        if (post.author.toString() !== userId) {
            return res.status(403).json({ error: 'Unauthorized' });
        }

        await Post.deleteOne({ _id: postId }); // Fixed method to delete post
        res.json({ message: 'Post deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getPostById = async (req, res) => {
    const postId = req.params.id;
    const userId = req.userId;  // Assuming `userId` is attached by authentication middleware

    try {
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        // Check if the post belongs to the logged-in user
        if (post.author.toString() !== userId) {
            return res.status(403).json({ error: 'Unauthorized' });
        }

        res.json(post);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getAllPostsByUser = async (req, res) => {
    const userId = req.userId;

    try {
        const posts = await Post.find({ author: userId }).populate('author', 'username email');;
        res.json(posts);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate('author', 'username email');
        res.json(posts);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
