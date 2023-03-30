//this is schema of users

const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const AVATAR_PATH = path.join('/uploads/users/avatars');    //path to store all avatars

const userSchema= new mongoose.Schema({
    //keep the most important or frequenty used fields at top
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true,
    },

    name : {
        type : String,
        required : true
    },
    avatar: {
        type: String
    }
},
    //when this is user is created
    //when details of this user updated
    //these fields can be automatically maintained by mongoose using following commands
    {
        timestamps : true
    }
);

//diskstorage
let storage = multer.diskStorage({
    //cb is callback function
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,'..',AVATAR_PATH));
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, file.fieldname + '-' + uniqueSuffix);    //file.fieldname is the name we gave in the schema i.e. avatar
    }
  });
  
//static function which can be called over whole class
userSchema.statics.uploadedAvatar = multer({storage: storage}).single('avatar');   //assinging the above diskstorage to the storage field of multer
userSchema.statics.avatarPath = AVATAR_PATH; //making the path publicly available so that it exist publicly in users_controller


//collection name
const User = mongoose.model('User', userSchema);
module.exports = User;