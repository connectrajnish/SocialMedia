//this page will route differnet actions under profile
const express=require('express');
const router=express.Router();
const usersController=require('../controller/users_controller');
// router.get('/',usersController.users);
router.get('/profile',usersController.profile);
router.get('/sign-up',usersController.signUp);      //kebab case for url
router.get('/sign-in',usersController.signIn);
router.post('/create', usersController.create);
router.post('/create-session', usersController.createSession);
router.get('/sign-out',usersController.signOut)
module.exports=router;