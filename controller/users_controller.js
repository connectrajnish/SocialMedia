//it will export various users action, basically a collection of differnt routes under users page

const User = require('../models/users');

module.exports.profile = function(req,res){
    User.findById(req.params.id, function(err, user){
        return res.render('users',{
            title:'profile',
            profile_user : user
        });
    });
};

//update profile
module.exports.update = function(req,res){
    if(req.user.id == req.params.id){
        User.findByIdAndUpdate(req.params.id, req.body, function(err, user){
            return res.redirect('back');
        });
        
    }
    else{
        return res.status(401).send('Unauthorised');
    }
}

module.exports.users = function(req,res){
    return res.render('users',{             // users is views name
        title:'users'
    });
};

//to render sign-up page
module.exports.signUp = function(req,res){
    if(req.isAuthenticated()){
        //i.e. if user is logged in already
        return res.redirect('/users/profile');
    }

    return res.render('user_sign_up', {
        title : 'Sign Up'
    });
};

//to render the sign-in page 
module.exports.signIn = function(req,res){
    if(req.isAuthenticated()){
        //i.e. if user is logged in already
        return res.redirect('/users/profile');
    }
    
    return res.render('user_sign_in',{
        title: 'Sign In'
    });
};

//after the signup page loads, and user submits the details then this action will be called by the form on clicking signup
module.exports.create = function(req,res){
    //if password doesn't match
    if(req.password != req.confirm_password){
        return res.redirect('back');
    }

    User.findOne({email: req.body.email}, function(err, user){
        if(err){console.log('error in finding user in signing up'); return}

        if (!user){
            User.create(req.body, function(err, user){
                if(err){console.log('error in creating user while signing up'); return}

                return res.redirect('/users/sign-in');
            })
        }else{
            return res.redirect('back');
        }

    });
}

//sign in and create a session for the user
module.exports.createSession = function(req, res){
    // return res.redirect('/');
    return res.render('users',{
        title: 'Profile Page',   //user is now available in locals, passed from passport config after authentication
        profile_user: {
            'name'  : req.user.name,
            'email' : req.user.email
        },
        user: {
            'name'  : req.user.name,
            'email' : req.user.email
        }
    });
};

module.exports.destroySession = function(req,res){
    //logout is handled by passport
    req.logout(function(err) {
        if (err) { 
            console.log(err);
            return res.redirect('/'); }
      });   
    return res.redirect('/users/sign-in');
}