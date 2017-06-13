var db = require("../models");

module.exports = function(app, passport) {
	app.get("/post", function(req, res){
		res.redirect("/");
	});

	app.post("/post", function(req, res){
		db.Post.create({
			post: req.body.post,
			UserId: req.user.id
		}).then(function(data){
			res.redirect("/post");
		});
	});
};