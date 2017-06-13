var db = require("../models");

module.exports = function(app, passport) {

	app.get("/", function(req, res) {
		if(!req.user) {
			res.render("home", {user:req.user});
		}
		else {
			db.Post.findAll({raw:true}).then(function(data){
				console.log(data);
				res.render("home", {feed:data, user:req.user});
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
		res.render("login");
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