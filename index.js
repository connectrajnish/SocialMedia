const express = require('express');
const port = process.env.port || 8080;

//fireup the app
const app = express();

//setting up view engine
app.set('view engine','ejs');
app.set('views','./views');


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