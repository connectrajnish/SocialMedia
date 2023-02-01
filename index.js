const express = require('express');
const port = process.env.port || 8080;

//fireup the app
const app = express();

//add a middleware module for all the routes using express router
app.use('/',require('./routes')); //by default it takes index.js file


//start listening on the port
app.listen(port,function(err){
    if(err){
        console.log(`Error occured: ${err}`);
        return;
    }
    console.log(`Server is running on port: ${port}`);
});