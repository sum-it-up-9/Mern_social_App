const express=require('express');
const cookieParser=require('cookie-parser')
const app=express();
const port=8000;
const expressLayouts=require('express-ejs-layouts');
const db=require('./config/mongoose');
const cors = require('cors');

//used for session cookie
const session=require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport-local-strategy');

const MongoDBStore=require("connect-mongodb-session")(session);
const sassMiddleware=require('node-sass-middleware');

const flash = require('connect-flash');
const customMware = require('./config/middleware');
app.use(cors());
// setup the chat server to be used with socket.io
const chatServer = require('http').Server(app);
const chatSockets = require('./config/chat_sockets').chatSockets(chatServer);
chatServer.listen(5000);
console.log('chat server is listening on port 5000');


app.use(sassMiddleware({
    src:'./assets/scss',
    dest:'./assets/css',
    debug:true,
    outputStyle:'extended',
    prefix:'/css'
}));

//middlewares
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

//static folder
app.use(express.static('./assets'));
app.use('/uploads', express.static(__dirname + '/uploads'));

//use express router
app.use(expressLayouts);

// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


//setting up view engine which is 'ejs'
app.set('view engine', 'ejs');
app.set('views','./views');


//mongo store is used to store seesion cookie in the db
app.use(session({
    name:'codeial',
    secret:'Mern-app',//use to encrypt
    saveUninitialized:false, //do i want to save data of user who is not looged in
    resave:false,
    cookie:{
        maxAge:(1000*60*100)

    },
    store: new MongoDBStore(
        {
            mongooseConnection: db,
            autoRemove: 'disabled'
        },
        function(err){
            console.log(err || 'connect-mongodb setup ok');
        }
     
    )
}));


app.use(passport.initialize());
app.use(passport.session());


app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash);

app.use('/',require('./routes'));

app.listen(port,function(err){
    if(err){
        console.log('Error in running the server',err)
    }

    console.log('server is running on port',port)
});