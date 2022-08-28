const express=require('express');
const router=express.Router();
const passport=require('passport'); 

const userController=require('../controllers/users_controller');

router.get('/profile',passport.checkAuthentication,userController.profile);

router.get('/sign-in',userController.signIn);

router.get('/sign-up',userController.signUp);

    
router.get('/sign-out',userController.destroySession);

router.post('/create',userController.create);


router.post('/users/create-session',passport.authenticate(
    'local',
    {failureRedirect: '/user/sign-in'},),userController.createSession);



module.exports = router;