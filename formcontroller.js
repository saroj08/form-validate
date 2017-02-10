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


// app.get('/form',function(req,res){
//   console.log("ghdigheogirehio");
//     res.render('form');
// })

app.post('/form',urlencodedparser,function(req, res) {
  var count = 0;
console.log('req.body');
console.log(req.body);
connection.query('select * from new_table',function(err,rows){
    if(err)
    throw err;
  else{
    for( var i in rows)
    {console.log("called");
    if(rows[i].email== req.body.uemail||rows[i].firstname== req.body.fname||rows[i].lastname== req.body.lname)
    {     count++;
    console.log("user already exist");
     //res.render("form",{title:"already registered"});

     //res.end();
    } }
     if(count==0){
     connection.query("Insert into new_table (firstname,lastname,email) VALUES('"+req.body.fname+"','"+req.body.lname+"','"+req.body.uemail+"')",function(err, result,fields)
     {
          if (err){
          throw err;}
          console.log("connection successful");
          // var html="<h1>welcome to this page</h1>";
          // res.write(html);
          // res.sendFile(path.join(__dirname + '/welcome.html'));
          // res.write('You sent the name "' + req.body.fname+'".\n'+"<br>");
          // res.write('You sent the name "' + req.body.lname+'".\n'+"<br>");
          // res.write('You sent the Email "' + req.body.uemail+'".\n'+"<br>");
var d=req.body.fname;
          res.render("welcome",{title:"successfullly registered"+""+d});

          // connection.end();
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
