var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");

var campgrounds = [
		{name:"Salmon Creek", image:"https://cdn.pixabay.com/photo/2016/02/18/22/16/tent-1208201_960_720.jpg"},
		{name:"Granite Hill", image: "https://cdn.pixabay.com/photo/2016/11/21/15/14/camping-1845906_960_720.jpg"},
		{name:"Mountain Goat's Rest", image:"https://cdn.pixabay.com/photo/2018/12/24/22/19/camping-3893587_960_720.jpg"},
	    {name:"Salmon Creek", image:"https://cdn.pixabay.com/photo/2016/02/18/22/16/tent-1208201_960_720.jpg"},
		{name:"Granite Hill", image: "https://cdn.pixabay.com/photo/2016/11/21/15/14/camping-1845906_960_720.jpg"},
		{name:"Mountain Goat's Rest", image:"https://cdn.pixabay.com/photo/2018/12/24/22/19/camping-3893587_960_720.jpg"},
	    {name:"Salmon Creek", image:"https://cdn.pixabay.com/photo/2016/02/18/22/16/tent-1208201_960_720.jpg"},
		{name:"Granite Hill", image: "https://cdn.pixabay.com/photo/2016/11/21/15/14/camping-1845906_960_720.jpg"},
		{name:"Mountain Goat's Rest", image:"https://cdn.pixabay.com/photo/2018/12/24/22/19/camping-3893587_960_720.jpg"}
];

app.get("/",function(req,res){
	res.render("landing");
});

app.get("/campgrounds",function(req,res){
	
	res.render("campgrounds",{campgrounds:campgrounds});
});

app.post("/campgrounds",function(req,res){
	//res.send("You HIT THE POST ROUTE!");
	
	//get data from form and add to campgrounds array
	var name = req.body.name;
	var image = req.body.image;
	var newCampground = {name:name,image:image}
	campgrounds.push(newCampground);
	res.redirect("/campgrounds");
});

app.get("/campgrounds/new",function(req,res){
	res.render("new.ejs");
});

app.listen(9000,function(){
	console.log("The YelpCamp Server Has Started!");
});