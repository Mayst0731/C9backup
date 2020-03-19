var mongoose= require("mongoose");
mongoose.connect("mongodb://localhost:27017/blog_demo",{useNewUrlParser: true,useUnifiedTopology: true,useFindAndModify: false, useCreateIndex: true });

//POST -title, content
var postSchema = new mongoose.Schema({
	title:String,
	content:String
});

var Post = mongoose.model("POST", postSchema);

//USER -email
var userSchema = new mongoose.Schema({
	email:String,
	name: String,
	posts:[postSchema]
});

var User = mongoose.model("User", userSchema);

var newUser = new User({
	email:"hermione@hogwarts.edu",
	name:"Herminone Granger"	
});

newUser.posts.push({
	title:"How to bre polyjuice potion",
	content:"Just kidding. Go to potions class to learn it!"
});

newUser.save(function(err,user){
	if(err){
		console.log(err);
	}else{
		console.log(user);
	}
});

// var newPost = new Post({
// 	title:"Reflection on Apples",
// 	content:"They are delicious"
// });

// newPost.save(function(err,post){
// 	if(err){
// 		console.log(err);
// 	}else{
// 		console.log(post);
// 	}
// });
User.findOne({name:"Herminone Granger"},function(err,user){
	if(err){
		//console.log(err);
	}else{
		user.posts.push({
			title:"3 thins I really hate",
			content:"Voldemort. Voldemort. Voldemort"
		});
		user.save(function(err,user){
			if(err){
				console.log(err);
			}else{
				console.log(user);
			}
		});
	}
});
