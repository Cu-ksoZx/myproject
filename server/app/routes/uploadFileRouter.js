var express = require('express');
var path = require('path');
var fs = require('fs');
var bodyParser = require('body-parser');
var uploadFileRouter = express.Router();
var multer = require('multer');

uploadFileRouter.use(bodyParser.urlencoded({
	extended: true
}));

// uploadFileRouter.use(multer({
// 	dest: path.resolve('myProject/public/')
// }
// ));

uploadFileRouter.get('/uploadFile', function(req, res) {

	res.sendfile(path.resolve('public/uploadPage.html'));
});

uploadFileRouter.post('/uploadFile.do', function(req, res) {
	var file = req.files.myfile;
	fs.readFile(file.path, function(err, data) {
		if (err) res.send("读文件操作失败");
		else {
			fs.writeFile(file.name, data, function(err) {
				if (err) res.send("写文件操作失败.");
				else res.send("文件上传成功");
			})
		}
	});
});



module.exports = uploadFileRouter;