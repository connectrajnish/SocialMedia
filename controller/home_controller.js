//export a function which will be publicly available to the route file

const Post = require('../models/post');
const User = require('../models/users');

module.exports.home=function(req,res){                      //home, a name give to the function
    
    //rendering POSTS without user i.e. without populating
    // Post.find({}, function(err, posts){
    //     return res.render('home',{
    //         title:'Home',
    //         posts: posts
    //     });
    // });
    //rendering posts who has posted the post alongwith POST
    
    //populate(), lets you reference documents in other collections.
    // Post.find({}).populate([{
    //     path: 'user',
    //     populate: {
    //         path: 'comments',   //references to comments array of post model
    //         populate: {
    //             path: 'user'    //references to user in post model
    //         }
    //     }
    // }])
    Post.find({})
    .populate('user')
    //to load comments
    // .populate({
    //     path: 'comments',
    //     populate: {
    //         path: 'user'
    //     }
    // })
    .exec(function(err, allPosts){
            User.find({}, function(err, users){
                return res.render('home',{
                    title:'Home',
                    posts: allPosts,
                    all_users: users
                });
            })
    });
};

// .populate([{
//     path : 'comments',
    
// }])