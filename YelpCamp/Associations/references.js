var mongoose= require("mongoose");
mongoose.connect("mongodb://localhost:27017/blog_demo_2",{useNewUrlParser: true,useUnifiedTopology: true,useFindAndModify: false, useCreateIndex: true });

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
	posts:[
		{
			type: mongoose.Schema.Types.ObjectId,
			ref:"Post"
		}
	]
});

var User = mongoose.model("User", userSchema);

Post.create({
	title:"How to cook the best burger pt.2",
	content:"blah blah blah"
},function(err,post){
	User.findOne({email:"bob@mail.com"},function(err,foundUser){
		if(err){
			console.log(err);
		}else{
			foundUser.posts.push(post);
			foundUser.save(function(err,data){
				if(err){
					console.log(err);
				}else{
					console.log(data);
				}
			});
		}
	});
});


