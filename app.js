var express=require ("express");

var app=express();
app.set('view engine','ejs');
app.use(express.static("./public"));
// app.set("views","./views");
var formController=require("./formcontroller/formcontroller");
formController(app);
app.listen(3000);
console.log("listening at port");
// module.exports = app;
app.get('/',function(req,res){
  console.log("got");
res.render('form');
});
