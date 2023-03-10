//Schema for post 
//It'll relationship between user & post

const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    
    user: {
        //linking post to user
        // keep a reference to the Users Schema object so that the post can be linked to a unique user
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' //reference to User schema
    },
    //include the array of ids of all comments in this post schema itself
    comments: [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Comment'
    }]
},{
    timestamps: true
});

const Post = mongoose.model('POST', postSchema);
module.exports = Post;