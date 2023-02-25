const Comment = require('../models/comments');
const Post = require('../models/post');

module.exports.create = function(req,res){
    // find the post with the post id first so that incase if someone fiddle with the html on frontend then firstly the post is searched with the id and then comment is added
    Post.findById(req.body.postId, function(err, post){
        if(err){
            console.log('Error', err);
            return;
        }
        if(post){
            //then create a comment in db
            Comment.create({
                content : req.body.content,
                post:post._id,
                user: req.user._id
                //console.log(req.body._id);
            }, function(err, comment){
                if(err){
                    console.log('Error', err);
                    return;
                }

                //updating the array of post's comment
                post.comments.push(comment);
                post.save();
                res.redirect('back');
            });
        }
    },
    {
        timestamps: true
    });
}