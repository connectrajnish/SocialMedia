const passport = require('passport');

//for strategy property require following
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/users');

//authentication using passport
// tell passport to use this loacl strategy i.e. middleware
passport.use(new LocalStrategy({
        usernameField: 'email'  //the unique thing, usernameField is a default syntax
    },
    //the callback function
    //done is a function which handles request is successfull or not etc. and report to passport js
    function(email, password, done){
        //find a user and eastablish the identity
        User.findOne({email:email}, function(err, user){
            if(err){
                console.log('Error in finding user --> passport');
                return done(err);
            }
            if(!user || user.password!=password){
                console.log('Invalid username/password');
                return done(null,false);    //error null, but authentication fails
            }
            return done(null, user);        //it will be returned to serializer
        });
    }

));

// serialize: which field of user is to be kept in the cookie for identification
passport.serializeUser(function(user,done){
    done(null, user.id); //user_id will be set in cookie in encrypted format but this session data is temporary bcz when server restarts the session dat will be deleted and we need to sign in again

}); 


// deserialize: identifing the user from a field id present in the cookie
passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        if(err){
            console.log('Error: ',err);
            return;
        }
        return done(null,user);
    });
});

//sending data to the profile page
//firstly check if user is authenticated and it will be used as middleware before sending data
passport.checkAuthentication = function (req, res, next){
    //following detects if user is signed in
    if(req.isAuthenticated()){
        return next();      //pass request to next() function
    }

    //if user is not signed in
    return res.redirect('/users/sign-in');
}

//to render the user's information
passport.setAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated()){   // if request is authenticated then
        // sending to locals for views
        res.locals.user = req.user; //users credential is in req.user while signing in, handled by passport 
    }
    next();
};

//export passport
module.exports = passport;