var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var Comment = require("../models/comment");

//INDEX - show all campgrounds
router.get("/",function(req,res){
	console.log(req.user);
	
	//Get all campgrounds from DB
	Campground.find({},function(err,allCampgrounds){
		if(err){
			console.log(err);
		}else{
			res.render("campgrounds/index",{campgrounds:allCampgrounds});
		}
	});
});

//CREATE - add new campground to DB
router.post("/", isLoggedIn, function(req,res){
	
	//get data from form and add to campgrounds array
	var name = req.body.name;
	var image = req.body.image;
	var desc =req.body.description;
	var newCampground = {name:name,image:image,description:desc};
	//Create a new campground and save to DB
	Campground.create(newCampground,function(err,newlyCreated){
		if(err){
			console.log(err);
		}else{
			//redirect back to campgrounds page
			res.redirect("/campgrounds");
		}
	});
});

//NEW - show form to create new campground
router.get("/new",function(req,res){
	res.render("campgrounds/new.ejs");
});

//SHOW - shows more info about one campground
router.get("/:id", isLoggedIn, function(req,res){
	//res.send("THIS WILL BE THE SHOW PAGE ONE DAY!");
	Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
		if(err){
			console.log(err);
		}else{
			console.log(foundCampground);
			res.render("campgrounds/show",{campground:foundCampground});
		}
	});	
});

function isLoggedIn(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}

module.exports = router;