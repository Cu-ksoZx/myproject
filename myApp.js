var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');
var path = require('path');
var router= require('./server/app/routes/index.js');



app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'jade');


app.use(cookieParser());

app.use('/',router);



app.set('title', 'Archer Application');

// 只用于开发环境
if ('development' === app.get('env')) {
app.set('db_uri', 'localhost/dev');
}

// 只用于生产环境
if ('production' === app.get('env')) {
app.set('db_uri', 'n.n.n.n/prod');
}

app.listen(1337,'127.0.0.1');