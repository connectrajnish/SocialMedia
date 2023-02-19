//it is  controller for posts
const Post = require('../models/post');

module.exports.posts=function(req,res){
    return res.render('posts',{
        title:'Posts'
    });
}

module.exports.create = function(req,res){
    //create a post using Post Schema
    Post.create({
        content: req.body.content,
        user : req.user._id
    },
    function(err, post){
        if(err){
            console.log('Error ', err);
            return;
        }
        res.redirect('back');
    }
    );
};