//export a function which will be publicly available to the route file

const Post = require('../models/post');

module.exports.home=function(req,res){                      //home, a name give to the function
    
    //rendering POSTS without user i.e. without populating
    // Post.find({}, function(err, posts){
    //     return res.render('home',{
    //         title:'Home',
    //         posts: posts
    //     });
    // });
    //rendering posts who has posted the post alongwith POST
    Post.find({}).populate('user').exec(function(err, posts){
            return res.render('home',{
                title:'Home',
                posts: posts
            });
        });
};