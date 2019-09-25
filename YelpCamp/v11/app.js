var express        = require("express"),
    app            = express(),
    bodyParser     = require("body-parser"),
	mongoose       = require("mongoose"),
	flash          = require("connect-flash"),
	passport       = require("passport"),
	LocalStrategy  = require("passport-local"),
	methodOverride = require("method-override"),
    Campground     = require("./models/campground"),
	Comment        = require("./models/comment"),
	User           = require("./models/user"),
	seedDB         = require("./seeds");
	
//requring routes
var commentRoutes = require("./routes/comments"),
	campgroundRoutes=require("./routes/campgrounds"),
	indexRoutes      =require("./routes/index")
	

mongoose.connect("mongodb://localhost:27017/yelp_camp_v9",{useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended:true}));  //use for html in ejs
app.set("view engine","ejs");                    //if you declare view engine means no need to define route name with extension
app.use(express.static(__dirname + "/public")); //use for css
app.use(methodOverride("_method"));        //use for update and delete methodoverride _method
app.use(flash());                          //use flash before passport configuration
//seedDB(); //seed the database

//PASSPORT CONFIGURATION       //use for session id
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

//declare user by local,user variable can use anywhere .
app.use(function(req,res,next){
	res.locals.currentUser = req.user;
	res.locals.error=req.flash("error");
	res.locals.success=req.flash("success");
	next();
});

//set routes and call the routes
app.use("/",indexRoutes);
app.use("/campgrounds",campgroundRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);

app.listen(9000,function(){
	console.log("The YelpCamp Server Has Started!");
});


