//export a function which will be publicly available to the route file
module.exports.home=function(req,res){                      //home, a name give to the function
    return res.render('home',{
        title:'Home'
    });
};