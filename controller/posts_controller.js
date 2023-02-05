//it is  controller for posts
module.exports.posts=function(req,res){
    return res.render('posts',{
        title:'Posts'
    });
}