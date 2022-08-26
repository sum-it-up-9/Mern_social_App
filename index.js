const express=require('express');
const cookieParser=require('cookie-parser')
const app=express();
const port=8000;
const expressLayouts=require('express-ejs-layouts');
const db=require('./config/mongoose');


//middlewares
app.use(express.urlencoded());
app.use(cookieParser());

app.use(expressLayouts);
//extract style and scripts from sub pages into the layout

app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

//static folder
app.use(express.static('./assets'));

//use express router
app.use('/',require('./routes'));

//setting up view engine which is 'ejs'
app.set('view engine', 'ejs');
app.set('views','./views');

app.listen(port,function(err){
    if(err){
        console.log('Error in running the server',err)
    }

    console.log('server is running on port',port)
});