var bodyparser=require("body-parser");
var urlencodedparser=bodyparser.urlencoded({extended:false});
var mysql      = require('mysql');
var path = require('path');
var multer=require('multer');
//var mltr=multer({ dest: './uploads/'}).single('File');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
   database : 'newdatabase'
});

connection.connect();
// connection.query("use "+ "newdatabase");
// connection.query('use'+'newdatabase');



module.exports=function(app){


// app.get('/form',function(req,res){
//   console.log("ghdigheogirehio");
//     res.render('form');
// })

app.post('/form',urlencodedparser,function(req, res) {
  var storage =   multer.diskStorage({

    destination: function (req, file, callback) {
      console.log("*************************************************************************************");
      callback(null, './public/images');
    },
  filename: function (req, file, callback) {
   callback(null, file.originalname);
  }
  });
  var upload = multer({ storage : storage}).single('File');
  upload(req,res,function(err) {
        if(err) {
            return res.end("Error uploading file.");
        }
      console.log("successful");
    });

  var count = 0;
  var img;
console.log('req.body');
console.log(req.body);
connection.query('select * from new_table',function(err,rows){
    if(err)
    throw err;
  else{
    for( var i in rows)
    {
    if(rows[i].email== req.body.uemail||rows[i].firstname== req.body.fname||rows[i].lastname== req.body.lname)
    {     count++;
    console.log("user already exist");
    console.log(rows[i].email);
    // console.log(rows[i]["image"].toString());
    img=rows[i]["image"].toString();
    console.log(img);
     //res.render("form",{title:"already registered"});

     //res.end();
    } }
     if(count==0){
     connection.query("Insert into new_table (firstname,lastname,email,image) VALUES('"+req.body.fname+"','"+req.body.lname+"','"+req.body.uemail+"','"+req.body.File+"')",function(err, result,fields)
     {
          if (err){
          throw err;}
          console.log("connection successful");
var d=req.body.fname;
var i=req.file.filename;
console.log(i);


  // img=rows[39]["image"].toString();
          res.render("welcome",{title:"successfullly registered"+"     "+d,image:"images/"+i});
          res.end();
        });

      }else{

        res.render("form",{title:"Already Registered"});
      }

}


// res.render("welcome");

// console.log('Example app listening at port:3000');

});
});
};
