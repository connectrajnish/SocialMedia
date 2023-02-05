//it will export various users action, basically a collection of differnt routes under users page

module.exports.profile = function(req,res){
    return res.render('users',{
        title:'profile'
    });
};

module.exports.users = function(req,res){
    return res.render('users',{             // users is views name
        title:'users'
    });
};