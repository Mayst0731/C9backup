var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment   = require("./models/comment");

var data = [
	{name:"Cloud's Rest",
	 image:"https://images.pexels.com/photos/1414059/pexels-photo-1414059.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
	description: "blah blah blah"
	},
	{name:"Desert Mesa",
	 image:"https://images.pexels.com/photos/2419278/pexels-photo-2419278.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
	description: "A great place worth visiting"
	},
	{name:"Puppy home",
	 image:"https://images.pexels.com/photos/1839753/pexels-photo-1839753.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
	description: "your puppy need a warm home"
	}
	
]
function seedDB(){
   //Remove all campgrounds
   Campground.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed campgrounds!");
        Comment.remove({}, function(err) {
            if(err){
                console.log(err);
            }
            console.log("removed comments!");
             //add a few campgrounds
            data.forEach(function(seed){
                Campground.create(seed, function(err, campground){
                    if(err){
                        console.log(err)
                    } else {
                        console.log("added a campground");
                        //create a comment
                        Comment.create(
                            {
                                text: "This place is great, but I wish there was internet",
                                author: "Homer"
                            }, function(err, comment){
                                if(err){
                                    console.log(err);
                                } else {
                                    campground.comments.push(comment);
                                    campground.save();
                                    console.log("Created new comment");
                                }
                            });
                    }
                });
            });
        });
    }); 
    //add a few comments
}
 
module.exports = seedDB;