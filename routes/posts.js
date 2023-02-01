const express = require('express');
const postsController=require('../controller/posts_controller');
const router=express.Router();

//requesting for 'posts/posts' will return it back
router.get('/posts',postsController.posts);
module.exports=router;

