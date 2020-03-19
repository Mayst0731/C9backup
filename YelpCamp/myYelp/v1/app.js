var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");
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

app.get("/campgrounds",function(req,res){
	res.render("campgrounds",		{campgrounds:campgrounds});
});

app.post("/campgrounds",function(req,res){
	//get data from form and add to campgrounds array
	var name = req.body.name;
	var image = req.body.image;
	var newCampground = {name: name, image: image};
	campgrounds.push(newCampground);
	//redirect back to campgrounds page	
	res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req,res){
	res.render("new.ejs");
});


app.listen(3000,function(){
	console.log("The YelpCamp Server Has Started!")
});