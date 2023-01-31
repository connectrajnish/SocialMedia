const express = require('express');
const port = process.env.port || 8080;

//fireup the app
const app = express();

// create routes
app.get('/',function(req,res){
    res.end('Hello');
});


//start listening on the port
app.listen(port,function(err){
    if(err){
        console.log(`Error occured: ${err}`);
        return;
    }
    console.log(`Server is running on port: ${port}`);
});