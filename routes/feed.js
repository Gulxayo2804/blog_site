const express = require('express');
const router = express.Router();
const { getPost, getPosts, createPost, updatePost, deletePost } = require('../controllers/feed')
const isAuth = require('../middleware/is-auth');

router.post('/post', isAuth, createPost);
router.get('/post/:postId', isAuth, getPost);
router.get('/posts', isAuth, getPosts);
router.put('/post/:postId', isAuth, updatePost)
router.delete('/post/:postId', isAuth, deletePost);

module.exports = router;