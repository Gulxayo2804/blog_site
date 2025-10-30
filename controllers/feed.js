const Post = require('../models/Post');

exports.createPost = async(req, res, next)=>{
  try{
      const post = new Post({
        title:req.body.title,
        content : req.body.content,
        imageUrl:'kk',
    })
    await post.save()
    res.status(200).json({
        message:'Post created',
        data:post
    })
  }
  catch(err){
    res.status(500)
  }
}