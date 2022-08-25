const express=require('express');
const router=express.Router();


const homeController=require('../controllers/home_controller');


console.log("router's index file loaded");

router.get('/',homeController.home);
router.use('/profile',require('./users'));

//for any further routes,access from here
//router.use('/routerName',require('./routerfilename));

module.exports = router;