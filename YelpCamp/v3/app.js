var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
	mongoose   =require("mongoose"),
    Campground =require("./models/campground"),
	seedDB     =require("./seeds");
	

mongoose.connect("mongodb://localhost:27017/yelp_camp_v3",{useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
seedDB();


app.get("/",function(req,res){
	res.render("landing");
});

//INDEX - show all campgrounds
app.get("/campgrounds",function(req,res){
	//Get all campgrounds from DB
	Campground.find({},function(err,allCampgrounds){
		if(err){
			console.log(err);
		}else{
			res.render("index",{campgrounds:allCampgrounds});
		}
	});
});

//CREATE - add new campground to DB
app.post("/campgrounds",function(req,res){
	
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
app.get("/campgrounds/new",function(req,res){
	res.render("new.ejs");
});

//SHOW - shows more info about one campground
app.get("/campgrounds/:id",function(req,res){
	//res.send("THIS WILL BE THE SHOW PAGE ONE DAY!");
	Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
		if(err){
			console.log(err);
		}else{
			console.log(foundCampground);
			res.render("show",{campground:foundCampground});
		}
	});	
});

app.listen(9000,function(){
	console.log("The YelpCamp Server Has Started!");
});

// { "_id" : ObjectId("5d6feea0e9463840581da08d"), "name" : "Salmon Creek", "image" : "https://cdn.pixab
// ay.com/photo/2016/02/18/22/16/tent-1208201_960_720.jpg", "__v" : 0 }
// { "_id" : ObjectId("5d6feecb3f4c3b408ffe5a74"), "name" : "Granite Hill", "image" : "https://cdn.pixab
// ay.com/photo/2016/11/21/15/14/camping-1845906_960_720.jpg", "__v" : 0 }
// { "_id" : ObjectId("5d6ff22ff991ce43a67bcaa1"), "name" : "Mountain Goat's Rest", "image" : "https://c
// dn.pixabay.com/photo/2018/12/24/22/19/camping-3893587_960_720.jpg", "__v" : 0 }
// { "_id" : ObjectId("5d6ff4df3480074650e5c05c"), "name" : "Mount", "image" : "https://cdn.pixabay.com/
// photo/2016/11/21/15/14/camping-1845906_960_720.jpg", "__v" : 0 }
