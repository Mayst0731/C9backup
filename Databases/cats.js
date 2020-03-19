var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/cat_app",{useNewUrlParser: true,useUnifiedTopology: true,useFindAndModify: false, useCreateIndex: true });

var catSchema = new mongoose.Schema({
	name: String,
	age: Number,
	temperament: String
});

var Cat = mongoose.model("Cat", catSchema);

Cat.create({
	name: "Snow White",
	age: 15,
	temperament: "Bland"
},function(err, cat){
	if(err){
		console.log("OH NO,ERROR!");
		console.log(err);
	}else{
		console.log("ALL THE CATS.....");
		console.log(cat);
	}
});
//adding a new cat to the DB
 // var george = new Cat({
 // name: "jerry",
 // age: 7,
 // 		temperament: "kind"
 // });

 // george.save(function(err,cat){
 // 	if(err){
 // console.log("SOMETHING WENT WRONG!")
 // 	}else{
 // 		console.log("WE JUST SAVED A CAT TO THE DB:")
 // 		console.log(cat);
 // 	}
 // });

//retrieve all cats from the DB and console.log each one 
Cat.find({},function(err,cats){
	if(err){
		console.log("OH NO, ERROR");
		console.log(err);
	}else{
		console.log("ALL THE CATS.....");
		console.log(cats);
	}
});






