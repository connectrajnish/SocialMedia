//export a function which will be publicly available to the route file

const Post = require('../models/post');
const User = require('../models/users');
const Comment = require('../models/comments');

module.exports.home= async function(req,res){                      //home, a name give to the function
    
    try{
        let all_posts = await Post.find({})
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        });

        let all_users = await User.find({});

        return res.render('home',{
            title:'Home',
            posts: all_posts,
            users: all_users
        });
    }
    catch(err){
        console.log(err);
        return;
    } 
};
