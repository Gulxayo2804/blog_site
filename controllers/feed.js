const Post = require('../models/Post');

exports.createPost = async (req, res, next) => {
  try {
    const post = new Post({
      title: req.body.title,
      content: req.body.content,
      imageUrl: 'kk',
    })
    await post.save()
    res.status(200).json({
      message: 'Post created',
      data: post
    })
  }
  catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}

exports.getPosts = async (req, res, next) => {
  const currentPage = req.query.page || 1;
  const perPage = 2;
  try {
    const TotalPosts = await Post.findDocumentCount();
    const posts = await Post.find()
      .skip((currentPage-1)*perPage)
      .limit(perPage);
    res.status(200).json({
      message: "Success!",
      posts,
      totalItems : TotalPosts
    })
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
}

exports.getPost = async (req, res, next) => {
  const postId = req.params.postId;
  const post = await Post.findById(postId);
  try {
    if (!post) {
      const error = new Error('could not find a post');
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({ message: 'Suceess!', post });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error)
  }
}

exports.updatePost = async (req, res, next) => {
  const postId = req.params.postId;

}