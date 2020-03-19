var express    = require("express"),
    app        = express(),
    bodyParser = require("body-parser"),
 	mongoose   = require("mongoose"),
	flash      = require("connect-flash"),
	passport   = require("passport"),
	LocalStrategy = require("passport-local"),
	methodOverride = require("method-override"),
	Campground = require("./models/campground"),
	Comment    = require("./models/comment"),
	User       = require("./models/user");
	//seedDB     = require("./seeds");

//requring routes	
 var commentRoutes    = require("./routes/comments"),
	 campgroundRoutes = require("./routes/campgrounds"),
	 indexRoutes       = require("./routes/index");

mongoose.connect("mongodb://localhost：27017/yelp_camp_v4",{useNewUrlParser: true,useUnifiedTopology: true,useFindAndModify: false, useCreateIndex: true });
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

//seedDB();

//PASSPORT CONFIGURATION
app.use(require("express-session")({
	secret:"Once again Rusty wins cutest dog!",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});

app.use("/",indexRoutes);
app.use("/campgrounds",campgroundRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);

//show login form
app.get("/register",function(req,res){
	res.render("register");
});
// handle sign up logic
app.post("/register",function(req,res){
	res.send("Signing you up...");
})

// handling login logic

app.post("/login",passport.authenticate("local",{successRedirect:"/campgrounds", failureRedirect:"/login"}),function(req,res){
	res.send("LOGIN LOGIC HAPPENS HERE");
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

app.listen(3000,function(){
	console.log("The YelpCamp Server Has Started!")
});