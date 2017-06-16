var db = require("../models");

module.exports = function(app, passport) {

	app.get("/", function(req, res) {
		if(!req.user) {
			res.render("home", {user:req.user});
		}
		else {
			// gets all the post on the feed
			db.Post.findAll({include:[{model:db.Comment, include:db.User}, db.User], order: 'createdAt DESC'}).then(function(data){
				// finds the users personal info
				db.User.findOne({where: {id: req.user.id}}).then(function(userInfo){
				res.render("home", {feed:data, user:req.user, personal: userInfo});
				})
			});
		}
	});

	app.post("/login", 
	 passport.authenticate("local", { 
	 	failureRedirect: "/login",
	 	failureFlash: true
	}), function(req, res, next){
	 	res.redirect("/");
	 });

	app.get("/login", function(req, res){
		res.render("login", {message: req.flash()});
	});

	app.get("/create", function(req, res){
		res.render("create");
	});


	//Only handling log-in info right now, needs to be expanded to also create user info
	app.post("/create", function(req, res){
		db.Member.findOne({
			where: {
				username: req.body.username
			}
		}).then(function(data){
			console.log(req.body);
			if(!data){
				db.Member.create({
					username: req.body.username,
					password: req.body.password
				}).then(function(member){
					db.User.create({
						first_name: req.body.first,
						last_name: req.body.last,
						email: req.body.email,
						image: req.body.image,
						MemberId: member.id
					}).then(function(){
						res.redirect("/login");
					});
				});
			}
			else{
				console.log("Username taken.");
				res.redirect("/create");
			}
		});
	});

	app.get("/logout", function(req, res){
		req.logout();
		res.redirect("/");
	});
}