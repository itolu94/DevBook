var db = require("../models");

module.exports = function(app, passport) {
	app.get("/post", function(req, res){
		if(!req.user) {
			res.redirect("login");
		}
		else {
			db.Post.findAll({raw:true}).then(function(data){
				console.log(data);
				res.render("post", {feed:data, user:req.user});
			});
		}
	});

	app.post("/post", function(req, res){
		db.Post.create({
			post: req.body.post,
			MemberId: req.user.id
		}).then(function(data){
			res.redirect("/post");
		});
	});
};