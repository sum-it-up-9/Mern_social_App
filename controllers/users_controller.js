const User=require('../models/user')

module.exports.profile=function(req,res){
    return res.render('profile')

};

module.exports.signUp=function(req,res){
    return res.render('user_sign_up')
};

module.exports.signIn=function(req,res){
    return res.render('user_sign_in')
}


module.exports.create=function(req,res){
    if(req.body.password != req.body.Confirm_Password){
        return res.redirect('back');
    }
    User.findOne({email:req.body.email},function(err,user){
        if(err){
            console.log('error in finding the user in signiing up');
            return
        }

        if(!user){
            User.create(req.body,function(err,user){
                if(err){
                    console.log('error in creating the user in signiing up');
                    return
                }
                console.log('user created');
                return res.redirect('/users/sign-in');        
        })}
        else{
            return res.redirect('back');
        }
    });


    //return res.render
}


module.exports.createSession=function(req,res){
    //
}