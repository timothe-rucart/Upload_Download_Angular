var express = require('express');
var router = express.Router();
var multer = require('multer');
var fs = require('fs'); 

var DIR = './uploads/';
//define the type of upload multer would be doing and pass in its destination, in our case, its a single file with the name photo
var upload = multer({dest: DIR}).single('photo');


//our file upload function.
router.post('/', function (req, res, next) {
  var path = '';
  upload(req, res, function (err) {
     if (err) {
       // An error occurred when uploading
       console.log(err);
       return res.status(422).send("an Error occured")
     }  
    // No error occured.    
     path = req.file.path;     
     return res.send(path); 
});     
})

router.post('/download', function(req,res,next){         
  var filepath = __dirname+'/../uploads/' + req.body.filename;       
  fs.readFile(filepath, function (err, data) { 
    return res.send(data); 
  });     
});

module.exports = router;
