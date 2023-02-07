//export a function which will be publicly available to the route file
module.exports.home = function(req,res){                      //home, a name give to the function
    //to change the value of the cookie of the response
    res.cookie('user_id',35);  //'name',value
    return res.render('home',{
        title:'Home'
    });
};