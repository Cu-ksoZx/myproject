var express = require('express');
var router = express.Router();
var usersRouter = require('./server/app/routes/usersRouter.js');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


userRouter.use('/user' ,usersRouter);


module.exports = router;
