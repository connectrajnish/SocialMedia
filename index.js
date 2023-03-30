const express = require('express');
const port = process.env.port || 8080;

//fireup the app
const app = express();

//models
const db = require('./config/mongoose');



//used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');

//for storing cookie in db
//for passing sessin as argument use connect-mongo@3
const MongoStore = require('connect-mongo')(session);   //express session is an argument bcz this session info we need to store into db


//using saas
// const sass = require('node-sass');
// app.use({
//     src: './assets/scss',
//     dest: './assets/css',
//     debug: true
//   }, function(err, result) { /*...*/ });

const flash = require('connect-flash');
const customMware = require('./config/middlware');
//parses incoming requests with urlencoded payloads
app.use(express.urlencoded({ extended: true}));

//setting up view engine
app.set('view engine','ejs');
app.set('views','./views');
app.use(express.static('./assets'));

//make uploads path available to the browser
app.use('/uploads', express.static(__dirname + '/uploads'));

//add express-session as middleware
//mongo store is used to store the session cookie in the DB
app.use(session({
    name: 'codeial',    //name of cookie
    secret:'sumthng',   //key to encode and decode
    
    //whenever there is a request which is not intialized i.e. user is not login then 'false'. Means don't set the cookie in such cases 
    saveUninitialized:false,
    
    //when user is logged in and some session data is already present in session cookie. Do i need to change the information again since it's not changed.
    resave: false,
    cookie:{
        maxAge: (1000*60*100)   //in ms
    },
    store: new MongoStore({
        mongooseConnection: db, //db = mongoose.connection is exported from mongoose.js
        autoRemove: 'disbaled' 
    },
    // a callback functin incase error in eastablishing connection
    function(err){
        console.log(err || 'connect-mongodb setup ok');
    }
    )
}));

//passport intialization after app intialization
app.use(passport.initialize());
app.use(passport.session());

//it'll check if session cookie is present or not, acts as middleware
//so whenever any request is coming in this middleware will be called and users will be set in locals and hence user will be accessible in views
app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash);

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