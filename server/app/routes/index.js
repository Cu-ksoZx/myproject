var express = require('express');
var router= express.Router();

var usersRouter= require('./usersRouter.js');
var uploadFileRouter = require('./uploadFileRouter.js');

var baseurl='/archer/v1';

/* GET home page*/

router.get('/',function (req,res,next) {
	res.render('welcome',{
		title:'welcome to Archers App'
	});
});


router.use('/user' ,usersRouter);




router.use('/tools',uploadFileRouter);

module.exports = router;