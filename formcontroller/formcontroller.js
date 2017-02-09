var bodyparser=require("body-parser");
var urlencodedparser=bodyparser.urlencoded({extended:false});
var mysql      = require('mysql');
var path = require('path');
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


app.post('/welcome.html',urlencodedparser,function(req, res) {
console.log('req.body');
console.log(req.body);
// var html="<h1>welcome to this page</h1>";
// res.write(html);
// res.sendFile(path.join(__dirname + '/welcome.html'));
res.write('You sent the name "' + req.body.fname+'".\n'+"<br>");
res.write('You sent the name "' + req.body.lname+'".\n'+"<br>");
res.write('You sent the Email "' + req.body.uemail+'".\n'+"<br>");
res.render("wecome");
connection.query("Insert into new_table (firstname,lastname,email) VALUES('"+req.body.fname+"','"+req.body.lname+"','"+req.body.uemail+"')",function(err, result,fields)
{
  if (err)
     throw err;
     console.log("connwction successful")
});



// console.log('Example app listening at port:3000');

connection.end();
res.end();
});
}
