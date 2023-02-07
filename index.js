//project dravn

const express = require('express');
const port = process.env.port || 8080;
const cookieParser = require('cookie-parser');
const db = require('./config/mongoose');


//fireup the app
const app = express();

//setting up view engine
app.set('view engine','ejs');
app.set('views','./views');

// to parse the incoming request
//The extended option allows to choose between parsing the URL-encoded data with the querystring library (when false) or the qs library (when true). The "extended" syntax allows for rich objects and arrays to be encoded into the URL-encoded format, allowing for a JSON-like experience with URL-encoded.
app.use(express.urlencoded({extended : true}));

//middleware to parse the request before action
app.use(cookieParser());

//add a middleware module for all the routes using express router
app.use('/',require('./routes')); //by default it takes index.js file or can be written as './routes/index'


//start listening on the port
app.listen(port,function(err){
    if(err){
        console.log(`Error occured: ${err}`);
        return;
    }
    console.log(`Server is running on port: ${port}`);
});