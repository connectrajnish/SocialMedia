const express = require('express');
const router = express.Router();
const passport = require('passport');

const commentsController = require('../controller/comments_controller');

//to create a comment
router.post('/create', passport.checkAuthentication, commentsController.create);

//to destroy a comment
router.get('/destroy/:id', passport.checkAuthentication, commentsController.destroy);

module.exports = router;