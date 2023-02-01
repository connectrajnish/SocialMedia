//this page will route differnet actions under profile
const express=require('express');
const router=express.Router();
const usersController=require('../controller/users_controller');
router.get('/profile',usersController.profile);
module.exports=router;