var express = require("express");
var router = express.Router({mergeParams:true});
var Campground = require("../models/campground");
var Comment = require("../models/comment");

//======================
//COMMENTS ROUTES
//======================

//  /campground/:id/comments/new
router.get("/new",isLoggedIn, function(req,res){
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

// /campground/:id/comments
router.post("/",isLoggedIn, function(req,res){
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
					//add username and id to comment
					 comment.author.id = req.user._id;
					 comment.author.username=req.user.username;
					 comment.save();
					//save comment
					campground.comments.push(comment);
					campground.save();
					console.log(comment);
					res.redirect('/campgrounds/' + campground._id);
				}
			});
		}
	});
});

//middleware
function isLoggedIn(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}

module.exports = router;