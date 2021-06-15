var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));

fs.readFileAsync('./test','utf8')
	.then(function(file){
		console.log(file);
		return fs.mkdirAsync('./testBluebird');
	})
	.then(function(){
	
		return fs.writeFileAsync('./testBluebird/test2.txt','xxx');
	})
	.catch(function(err){
		console.log('catch !!')
		console.log(err);
	});

// var fs = require('fs');

// fs.readFile('./test','utf8',function(err,data){
// 	if(err) console.log(err);

// 	fs.writeFile('./test2',data,function(err){
// 		if(err) console.log(err);
// 	});
// })