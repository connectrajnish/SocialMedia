//this page will route differnet actions under profile
const express=require('express');
const router=express.Router();
const passport = require('passport');

const usersController=require('../controller/users_controller');

// router.get('/',usersController.users);
router.get('/profile/:id', passport.checkAuthentication,usersController.profile); //profile page access is restricted through authentication
router.post('/update/:id', passport.checkAuthentication,usersController.update);


router.get('/sign-in', usersController.signIn)
router.get('/sign-up', usersController.signUp);
router.post('/create', usersController.create);

//use passport as a middleware to authenticate
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'}
), usersController.createSession);

//to sign-out
router.get('/sign-out',usersController.destroySession);

module.exports=router;