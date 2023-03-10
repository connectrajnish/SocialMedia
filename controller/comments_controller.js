const Comment = require('../models/comments');
const { findById } = require('../models/post');
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

module.exports.destroy = function(req, res){
    //check if the comment actually exists or not
    Comment.findById(req.params.id, async function(err, comment){
        if(err){
            console.log(err);
            return;
        }
        if(comment){
            //if the comment is found
            const post = await Post.findById(comment.post);

            //either the commenter or the poster can delete the comment
            if(comment.user == req.user.id || post.user == req.user.id){
                comment.remove();
                
                //pull out the comment Id from a list of comment 
                //$pull native mongodb syntax fo command line interface given by mongoose as well
                await Post.findByIdAndUpdate(post.id, {$pull: {comments: req.params.id}, function(err, post){
                    console.log('Document updated');
                    return res.redirect('back');
                }});
            }    
        }
        
        return res.redirect('back');
        
    });
}