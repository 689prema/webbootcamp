var express      = require("express"),
    app          = express(),
    bodyParser   = require("body-parser"),
	mongoose     =require("mongoose"),
	passport     =require("passport"),
	LocalStrategy=require("passport-local"),
    Campground   =require("./models/campground"),
	Comment      = require("./models/comment"),
	User         = require("./models/user"),
	seedDB       =require("./seeds");
	

mongoose.connect("mongodb://localhost:27017/yelp_camp_v6",{useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static(__dirname + "/public"));
seedDB();

//PASSPORT CONFIGURATION
app.use(require("express-session")({
	secret:"Once again Rusty wins cutest dog!",
	resave:false,
	saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
	res.locals.currentUser = req.user;
	next();
});

app.get("/",function(req,res){
	res.render("landing");
});

//INDEX - show all campgrounds
app.get("/campgrounds",function(req,res){
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
	res.render("campgrounds/new.ejs");
});

//SHOW - shows more info about one campground
app.get("/campgrounds/:id",function(req,res){
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

//======================
//COMMENTS ROUTES
//======================
app.get("/campgrounds/:id/comments/new",isLoggedIn, function(req,res){
	//res.send("THIS WILL BE THE COMMENT FORM!");
	//find campground by id
	Campground.findById(req.params.id,function(err,campground){
		if(err){
		   console.log(err);	
		}else{
			res.render("comments/new",{campground:campground});
		}
	});
});

app.post("/campgrounds/:id/comments",isLoggedIn, function(req,res){
	//lookup campground using ID
	Campground.findById(req.params.id, function(err,campground){
		if(err){
			console.log(err);
			res.redirect("/campgrounds");
		}else{
			//console.log(req.body.comment);		}
			Comment.create(req.body.comment, function(err,comment){
				if(err){
					console.log(err);
				}else{
					campground.comments.push(comment);
					campground.save();
					res.redirect('/campgrounds/' + campground._id);
				}
			});
		}
	});
});

//=================
//AUTH ROUTES
//=================

//show register form
app.get("/register",function(req,res){
	res.render("register");
});
//handle sign up logic
app.post("/register",function(req,res){
	//res.send("Signing you up...");
	var newUser = new User({username:req.body.username});
	User.register(newUser,req.body.password,function(err,user){
		if(err){
			console.log(err);
			return res.render("register")
		}
		passport.authenticate("local")(req,res,function(){
			res.redirect("/campgrounds");
		});
	});
});

//show login form
app.get("/login",function(req,res){
  res.render("login");	
});
//handle login logic  //add middle ware to check login username same or not from signup user
//app.post("/login",middleware,callback)
app.post("/login",passport.authenticate("local",             //middleware
      {
	     successRedirect:"/campgrounds",
	     failureRedirect:"/login"
      }),function(req,res){	                                  //callback
});

//logout route
app.get("/logout",function(req,res){
	req.logout();
	res.redirect("/campgrounds");
});

function isLoggedIn(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}

app.listen(9000,function(){
	console.log("The YelpCamp Server Has Started!");
});


