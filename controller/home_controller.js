//export a function which will be publicly available to the route file

const Post = require('../models/post');

module.exports.home=function(req,res){                      //home, a name give to the function
    Post.find({}, function(err, posts){
        return res.render('home',{
            title:'Home',
            posts: posts
        });
    });
};