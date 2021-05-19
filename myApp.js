var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');
var path = require('path');
var router= require('./server/app/routes/index.js');



app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'jade');


app.use(cookieParser());

app.use('/',router);




app.listen(1337,'127.0.0.1');