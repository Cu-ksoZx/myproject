var express= require ('express');
var router= express.Router();


router.get('/registration' , function (req,res) {
	res.send("test!~!!!!!");

});

module.exports =router;