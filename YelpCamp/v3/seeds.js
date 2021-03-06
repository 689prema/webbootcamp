var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment    =require("./models/comment");

var data = [
	{
		name:"Cloud's Rest",
		image : "https://cdn.pixabay.com/photo/2015/11/07/11/39/camping-1031360_960_720.jpg", 
		description : "This place is beautiful ."
	},
	{
		name:"Snow Mountain",
		image : "https://cdn.pixabay.com/photo/2017/08/17/08/08/camp-2650359_960_720.jpg", 
		description : "nice snow mountain ."
	},
	{
		name:"Mountain camp",
		image : "https://cdn.pixabay.com/photo/2018/12/24/22/19/camping-3893587_960_720.jpg", 
		description : "Mountain camp is beautiful ."
	},
	{
		name:"Mountain view",
		image : "https://cdn.pixabay.com/photo/2016/11/21/15/14/camping-1845906_960_720.jpg", 
		description : "Mountain and Water."
	}
]

function seedDB(){
	//REMOVE ALL CAMPGROUNDS
	Campground.remove({},function(err){
		if(err){
	        console.log(err);
	      }		  
         console.log("removed campgrounds!");
	 });
	//add a few campgrounds
	 data.forEach(function(seed){
		 Campground.create(seed,function(err,campground){
			  if(err){
				 console.log(err);
			  }else{
				 console.log("added a campground");
				 //create a comment
				 Comment.create(
				      {
						  text:"This place is great, but I wish there was internet",
						  author:"Homer"
					  },function(err,comment){
						  if(err){
							  console.log(err);
						  }else{
							  campground.comments.push(comment);
							  campground.save();
							  console.log("Created new comment");
						  }
					  });
			 }
		 }); 
	 });
	 
	//
}

module.exports = seedDB;