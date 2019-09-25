var express = require("express");
var app = express();

// "/"
app.get("/",function(req,res){
	res.send("Hi there, welcome to my assignment!");
});
// "/:Animal"
app.get("/speak/:Animal",function(req,res){
	//console.log(req.params);
	var name = req.params.Animal.toLowerCase();
//	var says="";
	//if(name === "pig"){
//		says = "Oink";
//	}
//	else if(name === "cow"){
//		says = "Moo";
//	}
//	else if(name === "dog"){
//		says = "Woof Woof";
//	}
//	else if(name === "sheep"){
//		says = "baa baa";
//	}
	var says ={
		pig:"Oink",
		cow:"Moo",
		dog:"Woof Woof!",
		cat:"I hate you human",
		goldfish:"..."
	}
	
	res.send("The " +name+ " says '"+says[name]+"'");
});

//"/repeat/hello/3"
app.get("/repeat/:word/:num",function(req,res){
	var words = req.params.word;
	var num = Number(req.params.num);
	var ans ="";
	for(var i=0;i<num;i++){
	   ans += words + " ";
	}
	//console.log(ans);
	res.send(ans);
});

app.get("*",function(req,res){
	res.send("Sorry, page not found.. What are you doing with your life?")
	
});


app.listen(9000,function(){
	console.log("Server Responding");
});