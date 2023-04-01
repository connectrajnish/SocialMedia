const Post = require('../../../models/post');
const Comment = require('../../../models/comments');

module.exports.index = async function(req, res){
    let all_posts = await Post.find({})
        .sort('-createdAt')
        .populate({
            path: 'user',
            select: '-password'
        })
        .populate({
            path: 'comments',
            populate: {
                path: 'user',
                select: '-password'
            },
            options: { sort: { createdAt: -1 } } // Sort comments by createdAt date in descending order    
        });

    return res.status(200).json({
        message: 'List of posts',
        posts: all_posts
    });
}

module.exports.destroy = async function(req,res){
    try{
        let post = await Post.findById(req.params.id);
        // if(post.user == req.user.id){        //for comparison it will be converted into string by mongoose. so instead ._id we wrote .id
            post.remove();
            
            await Comment.deleteMany({post: req.params.id});

            return res.status(200).json({
                message: 'Post deleted successfully'
            });
        // }
        // else{
        //     return res.redirect('back');
        // }
    }
    catch(err){
        console.log(err);
        return res.status(500).json(err)
    }
};