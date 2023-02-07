//this is index i.e. root of route so it will contain home route as well as list of other routes

const express = require('express');
const router = express.Router();
const homeController=require('../controller/home_controller');

//action
//routes to the homeController's home action
router.get('/',homeController.home); //home is the name of exported function in homeController

// whenever the path is '/users' then use this controller
router.use('/users',require('./users'));

// whenever the path is '/posts' then use this controller
router.use('/posts',require('./posts'));







module.exports=router;