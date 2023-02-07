//it will export various users action, basically a collection of differnt routes under users page

//import thr model
const User = require('../models/users');

module.exports.profile = function(req, res){
        //check if userId is present in cookie or not which signifies signedin or not
    if (req.cookies.user_id){
        User.findById(req.cookies.user_id, function(err, user){
            if (user){
                return res.render('users', {
                    title: "User Profile",
                    user: user
                })
            }else{
                return res.redirect('/users/sign-in');

            }
        });
    }else{
        return res.redirect('/users/sign-in');

    }


    
}

module.exports.users = function(req,res){
    return res.render('users',{             // users is views name
        title:'users'
    });
};

//rendering signup page
module.exports.signUp = function(req,res){
    return res.render('users_sign_up',{         //users_sign_up is views template for signup page
        title: 'Codeial | Sign Up'
    });
};

//rendering signin page
module.exports.signIn = function(req,res){
    return res.render('users_sign_in',{         //users_sign_in is views template for signin page
        title: 'Codeial | Sign In'
    });
};

//get the signup data
module.exports.create = function(req,res){
    //check if password and confirm password are same or not
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    //else if check if email is registerd or not
    User.findOne({email: req.body.email}, function(err, user){
        if(err){console.log('Error in finding the user in signing up');return;};

        //if user is not there in db then create
        if(!user){
            User.create(req.body, function(er, user){
                if(err){console.log('Error in creating the user in signing up');return;};
                
                return res.redirect('/users/sign-in')
            });
        }
        else {//if user is already present, go to sign in
            return res.redirect('/users/sign-in');
        }
    });

}

//get the signin data
module.exports.createSession = function(req,res){
    //find the user
    User.findOne({email:req.body.email}, function(err, user){
        if(err){console.log('Error in finding the user in signing in');return;};
        
        //handle if the user is found
        if(user){
            //handle if password doesn't match
                if(user.password != req.body.password){
                    return res.redirect('back');
                }
            //handle session creation
            res.cookie('user_id', user.id);
            return res.redirect('/users/profile');
        }
        else{       //handle if the user is not found
            return res.redirect('back');
        }
    });
    
    
}

module.exports.signOut = function(req,res){
    res. clearCookie('user_id'); 
    return res.redirect('/users/sign-in');
}