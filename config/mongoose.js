const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
//database url you’re connecting to:
const url = 'mongodb://127.0.0.1/codeial_development';

//connect to MongoDB with the connect method:
mongoose.connect(url);

//to check whether the connection succeeds
const db = mongoose.connection;
db.once('open', function(){
    console.log('Connected to Database :: MongoDB');
});
db.on('error', function(){
    db.on('error', console.error.bind(console, "Error connecting to MongoDB"));
});

//export
module.exports = db;
