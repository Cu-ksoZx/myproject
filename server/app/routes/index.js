var express = require('express');
var router= express ();

var baseurl='/archer/v1';

/* GET home page*/

router.get('/1',function (req,res,next) {
	res.render('welcome',{
		title:'Express'
	});

});

module.exports = router;