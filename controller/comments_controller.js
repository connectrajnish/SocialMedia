const Comment = require('../models/comments');
const Post = require('../models/post');

module.exports.create = async function(req,res){
    try{
        // find the post with the post id first so that incase if someone fiddle with the html on frontend then firstly the post is searched with the id and then comment is added
        let post = await Post.findById(req.body.postId);
        if(post){
            //then create a comment in db
            let comment = await Comment.create({
                content : req.body.content,
                post:post._id,
                user: req.user._id
                //console.log(req.body._id);
            });
            //updating the array of post's comment
            post.comments.push(comment);
            post.save();
            res.redirect('back');
        }
    }   
    catch(err){
        console.error(err);
        res.status(500).send("Server error");
    }     
}

module.exports.destroy = async function(req, res){
    try{
        //check if the comment actually exists or not
        let comment = await Comment.findById(req.params.id);
        if(comment){
            //if the comment is found
            const post = await Post.findById(comment.post);

            //either the commenter or the poster can delete the comment
            if(comment.user == req.user.id || post.user == req.user.id){
                comment.remove();
                
                //pull out the comment Id from a list of comment 
                //$pull native mongodb syntax fo command line interface given by mongoose as well
                await Post.findByIdAndUpdate(post.id, {$pull: {comments: req.params.id}, function(err, post){
                    //console.log('Document updated');
                    return res.redirect('back');
                }});
            }    
        }
        
        return res.redirect('back');
    }
    catch(err){
        console.error(err);
        res.status(500).send("Server error");
    }
}