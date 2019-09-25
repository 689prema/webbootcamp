var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

//root route
router.get("/",function(req,res){
	res.render("landing");
});

//show register form
router.get("/register",function(req,res){
	res.render("register");
});

//handle sign up logic
router.post("/register",function(req,res){
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
router.get("/login",function(req,res){
  res.render("login");	
});
//handle login logic  //add middle ware to check login username same or not from signup user
//app.post("/login",middleware,callback)
router.post("/login",passport.authenticate("local",             //middleware
      {
	     successRedirect:"/campgrounds",
	     failureRedirect:"/login"
      }),function(req,res){	                                  //callback
});

//logout route
router.get("/logout",function(req,res){
	req.logout();
	res.redirect("/campgrounds");
});

//middleware
function isLoggedIn(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}

module.exports = router;