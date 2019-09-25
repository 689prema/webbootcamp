var express = require("express");
var app = express();

app.use(express.static("public"));
app.set("view engine","ejs")

app.get("/",function(req,res){
	//res.send("<h1>Welcom to the home page</h1><h2>how are you</h2>");
	res.render("home");
});

app.get("/fallinglovewith/:thing",function(req,res){
	var thing = req.params.thing;
	res.render("love",{thingVar:thing});
});

app.get("/posts",function(req,res){
	var posts = [
		{title:"Post 1",author:"Susy"},
		{title:"My adorable pet bunny",author:"Charlie"},
		{title:"Can you believe this poms",author:"Colt"}
	];
	res.render("posts.ejs",{posts:posts});
});

app.listen(9000,function(){
	console.log("Server respond")
});
