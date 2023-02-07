//this is schema of users

const mongoose = require('mongoose');

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
    }
    },
    //when this is user is created
    //when details of this user updated
    //these fields can be automatically mainted by mongoose using following commands
    {
        timestamps : true
    }
);

//collection name
const User = mongoose.model('User', userSchema);

module.exports = User;