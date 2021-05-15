var express = require('express');
var app = express();
var path = require('path');

var router= require('./server/app/routes/index.js');

app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'jade');


app.use(router,function(){
	console.log('used middleware');
});



app.listen(1337,'127.0.0.1');