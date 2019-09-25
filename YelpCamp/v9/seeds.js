var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment    =require("./models/comment");

var seeds= [
	{
		name:"Cloud's Rest",
		image : "https://cdn.pixabay.com/photo/2015/11/07/11/39/camping-1031360_960_720.jpg", 
		description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit                        in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
	},
	{
		name:"Snow Mountain",
		image : "https://cdn.pixabay.com/photo/2017/08/17/08/08/camp-2650359_960_720.jpg", 
		description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit                        in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
	},
	{
		name:"Mountain camp",
		image : "https://cdn.pixabay.com/photo/2018/12/24/22/19/camping-3893587_960_720.jpg", 
		description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit                        in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
	},
	{
		name:"Mountain view",
		image : "https://cdn.pixabay.com/photo/2016/11/21/15/14/camping-1845906_960_720.jpg", 
		description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit                        in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
	}
];

async function seedDB(){
 try{
	// REMOVE ALL CAMPGROUNDS
	await Campground.remove({});
	//console.log("Campgrounds removed");
	await Comment.remove({});
	//console.log("Comments removed");
	
	  // for(const seed of seeds){
	  // let campground = await Campground.create(seed);
	  // console.log("Campground created");
	  // let comment = await Comment.create(
	  // {
	  // text:'This place is great, but I wish there was internet',
	  // author:'Homer'
	  // }
	  // )
	  // console.log("Comments created");
	  // campground.comments.push(comment);
	  // campground.save();
	  // console.log("Comment added to campground");
	  // }
		
 }catch(err){
	 console.log(err);
 }
}

module.exports = seedDB;