var express = require("express");
var app = express();

//"/" => "Hi there!"
app.get("/",function(req,res){
	res.send("Hi there!");
});

//"/bye" => "Goodbye!"
app.get("/bye",function(req,res){
	res.send("Goodbye!!");
});

// "/dog" => "MEOW!"
app.get("/dog",function(req,res){
	console.log("Some one made requests");
	res.send("MEOW!");
});
app.get("/r/:subredditName",function(req,res){
	var subreddit = req.params.subredditName;
	res.send("WELCOME TO THE " + subreddit.toUpperCase() +" SUBREDIT!");
});
app.get("/r/:subredditName/comments/:id/:title",function(req,res){
	console.log(req.params);
	res.send("WELCOME TO THE COMMENT PAGE!");
});

app.get("*",function(req,res){
	res.send("YOU ARE THE STAR!");
});


app.listen(9000,function(){
	console.log('Server listening on port 3000');
});

//PORT=3000 node app.js

