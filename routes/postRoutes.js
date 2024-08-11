const express = require('express');
const router = express.Router();
const postController = require('../controller/postController');
const authenticate = require('../middleware/authenticate');

router.post('/post', authenticate, postController.createPost);
router.put('/post/:id', authenticate, postController.updatePost);
router.delete('/post/:id', authenticate, postController.deletePost);
router.get('/post/:id', authenticate, postController.getPostById);
router.get('/posts', authenticate, postController.getAllPostsByUser);

//get all post without authenticate
router.get('/all-posts', postController.getAllPosts);


module.exports = router;
