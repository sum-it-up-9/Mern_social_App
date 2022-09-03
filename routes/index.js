const express=require('express');
const router=express.Router();


const homeController=require('../controllers/home_controller');


console.log("router's index file loaded");

router.get('/',homeController.home);

//all the routes which is after /user goes below e.g. /user/signup
router.use('/user',require('./user'));
router.use('/posts',require('./posts'));
router.use('/comments',require('./comments'));

router.use('/likes', require('./likes'));

//for any further routes,access from here
//router.use('/routerName',require('./routerfilename));

module.exports = router;