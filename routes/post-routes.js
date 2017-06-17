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
			res.redirect("/");
		});
	});

	app.post("/post/comment/:postid", function(req, res){
		db.Post.findOne({
			where: {
				id: req.params.postid
			}
		}).then(function(post){
			db.Comment.create({
				comment: req.body.comment,
				UserId: req.user.id,
				PostId: req.params.postid
			}).then(function(comment){
				res.redirect("/")
			});
		});
	});

	app.post("/post/like/:postid", function(req, res){
		db.Post.findOne({
			where: {
				id: req.params.postid
			}
		}).then(function(post){
			db.User.findOne({
				where: {
					id: req.user.id
				}
			}).then(function(user){
				post.addLike(user);
				res.redirect("/");
			});
		});
	});
};