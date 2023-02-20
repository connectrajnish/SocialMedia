const express = require('express');
const postsController=require('../controller/posts_controller');
const router=express.Router();
const passport = require('passport');

//requesting for 'posts/posts' will return it back
router.get('/posts',postsController.posts);

//to post something on the website after authentication
router.post('/create',passport.checkAuthentication,postsController.create);

module.exports=router;

