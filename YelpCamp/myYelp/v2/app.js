var express    = require("express"),
    app        = express(),
    bodyParser = require("body-parser"),
 	mongoose   = require("mongoose");

mongoose.connect("mongodb://localhost：27017/yelp_camp",{useNewUrlParser: true,useUnifiedTopology: true,useFindAndModify: false, useCreateIndex: true });
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");

//SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
	name: String,
	image: String,
	description: String
});
var Campground = mongoose.model("Campground", campgroundSchema);
// Campground.create(
// 	{name: "Granite Hill",image:"https://t3.ftcdn.net/jpg/01/17/08/12/240_F_117081237_Nz8HG6WHA55xCrlfdr4jiv3714lRaQxo.jpg",
// 	 description: "This is a huge granite hill, no bathrooms, no water, beautiful view!"
// 	},function(err,campground){
// 	if(err){
// 		console.log(err);
// 	}else{
// 		console.log("NEWLY CREATED CAMPGROUND: ");
// 		console.log(campground);
// 	}
	
// });

var campgrounds = [
		{name: "Salmon Creek",image:"https://t3.ftcdn.net/jpg/00/66/85/10/240_F_66851032_hqvRfoPt7WSOtFOI5RVeAqV9SnN5oZ8L.jpg"},
		{name: "Granite Hill",image:"https://t3.ftcdn.net/jpg/01/17/08/12/240_F_117081237_Nz8HG6WHA55xCrlfdr4jiv3714lRaQxo.jpg"},
		{name: "Mountain Goat's Rest",image:"https://www.lifeofpix.com/wp-content/uploads/2017/10/0g8a4446-horse-1600x1067.jpg"},
		{name: "Salmon Creek",image:"https://t3.ftcdn.net/jpg/00/66/85/10/240_F_66851032_hqvRfoPt7WSOtFOI5RVeAqV9SnN5oZ8L.jpg"},
		{name: "Granite Hill",image:"https://t3.ftcdn.net/jpg/01/17/08/12/240_F_117081237_Nz8HG6WHA55xCrlfdr4jiv3714lRaQxo.jpg"},
		{name: "Mountain Goat's Rest",image:"https://www.lifeofpix.com/wp-content/uploads/2017/10/0g8a4446-horse-1600x1067.jpg"},
		{name: "Mountain Goat's Rest",image:"https://www.lifeofpix.com/wp-content/uploads/2017/10/0g8a4446-horse-1600x1067.jpg"},
		{name: "Salmon Creek",image:"https://t3.ftcdn.net/jpg/00/66/85/10/240_F_66851032_hqvRfoPt7WSOtFOI5RVeAqV9SnN5oZ8L.jpg"},
		{name: "Granite Hill",image:"https://t3.ftcdn.net/jpg/01/17/08/12/240_F_117081237_Nz8HG6WHA55xCrlfdr4jiv3714lRaQxo.jpg"},
		{name: "Mountain Goat's Rest",image:"https://www.lifeofpix.com/wp-content/uploads/2017/10/0g8a4446-horse-1600x1067.jpg"}
];

app.get("/",function(req,res){
	res.render("landing");	
});


// INDEX -list all the campgrounds 
app.get("/campgrounds",function(req,res){
	//Get all campgrounds from DB
	Campground.find({},function(err, allCampgrounds){
		if(err){
			console.log(err);
		}else{
			res.render("index", {campgrounds:allCampgrounds});
		}
	});
	
	
});

// CREATE - add new campground to DB
app.post("/campgrounds",function(req,res){
	//get data from form and add to campgrounds array
	var name = req.body.name;
	var image = req.body.image;
	var desc = req.body.description;
	var newCampground = {name: name, image: image, description: desc};
	//Create a new campground and save to DB
	Campground.create(newCampground,function(err, newlyCreated){
		if(err){
			console.log(err);
		}else{
			//redirect back to campgrounds page	
			res.redirect("/campgrounds");	
		}
	});
});

// NEW - show form to create new campground
app.get("/campgrounds/new", function(req,res){
	res.render("new.ejs");
});

app.get("/campgrounds/:id",function(req,res){
	//find the campground with provided ID
	Campground.findById(req.params.id,function(err,foundCampground){
		if(err){
			console.log(err);
		}else{
			//render show template with that campground
			res.render("show", {campground: foundCampground});
		}
	});
	
	
});

app.listen(3000,function(){
	console.log("The YelpCamp Server Has Started!")
});