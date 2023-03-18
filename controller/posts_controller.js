//it is  controller for posts
const Post = require('../models/post');
const  Comment = require('../models/comments');

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
        //check if the request is ajax request then do this
        if(req.xhr){
            return res.status(200).json({
                data: {
                    post: post
                },
                message: 'Post Created!'
            });
        }

        
        res.redirect('back');
    }
    );
};

//deleting
/*
BEFORE DELETING A POST FIND EXISTENCE OF IT IN THE DATABASE
compare the post user and requested id in string format
if same then remove the post and all comments
else
redirect back



*/
module.exports.destroy = async function(req,res){
    try{
        let post = await Post.findById(req.params.id);
        if(post.user == req.user.id){        //for comparison it will be converted into string by mongoose. so instead ._id we wrote .id
            post.remove();
            
            await Comment.deleteMany({post: req.params.id});
            
            if(req.xhr){
                return res.status(200).json({
                    data: {
                        post_id:req.params.id
                    },
                    message: 'Post deleted'
                });
            }

            return res.redirect('back');
        }
        else{
            return res.redirect('back');
        }
    }
    catch(err){
        console.log(err);
        return;
    }
};