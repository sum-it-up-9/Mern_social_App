const passport=require('passport');

const LocalStrategy=require('passport-local').Strategy;


const User=require('../models/user')

passport.use(new LocalStrategy({
        usernameField:'email',
        passReqToCallback : true
    },
    //here email is usernamefield bcon we are using email as username
    function(req,email,password,done){
        User.findOne({email: email},function(err,user){
            if(err){
                console.log('Error in finidng the user -> Passport');
                return done(err);
            }

            if(!user || user.password != password){
                console.log('Invalid Username/Password');
                req.flash('error','Invalid Username/Password');
                
                return done(null,false);
            }

            return done(null,user); //false means user not found and null is for err argument
        })
    }
));


//serialing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user,done){
    done(null,user.id);
})

//desrializing the user from the key in the cookies (At server side)
passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err){
            console.log('Error in finding user ->passport');
            return done(err);
        }

        return done(null,user);
    });
});



//check if the user is authenticated
passport.checkAuthentication = function(req,res,next){
    //if tje user is signed in,then pass on the request to the next function(next means - controller's action)
    if(req.isAuthenticated()){
        return next();
    }

    //if the user is not signed in
    return res.redirect('/user/sign-in');

}


passport.setAuthenticatedUser=function(req,res,next){
    if(req.isAuthenticated()){
        //req.user contains the current signed in user from the sesion cookie and we just sending this to the locals fot the views
        res.locals.user=req.user;
        return next();
       
    }
    return next();
}