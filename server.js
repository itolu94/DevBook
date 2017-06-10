//Dependencies
var express = require('express');
var passport = require('passport');
var Strategy = require('passport-local').Strategy;
var bodyParser = require("body-parser");
var db = require("./models");

//Passport Configuration
passport.use(new Strategy(
  function(username, password, cb) {
    db.Member.findOne({where:{username:username}}).then(function(user) {
      if (!user) { return cb(null, false); }
      // if (!user.checkPassword(password)) { return cb(null, false); }
      user.checkPassword(password, function(err, res){
        console.log(res);
        if (err || !res){
          return cb(null, false);
        }
        else {
          return cb(null, user.toJSON());
        }
      });
    });
  }));

//Persistence Configuration
passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
  db.Member.findOne({where:{id: id}}).then(function(user) {
    cb(null, user);
  });
});

//Express Configuration
var app = express();

var PORT = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));

app.use(express.static("./public"));

app.use(passport.initialize());
app.use(passport.session());

//Using EJS for testing that logins work, switch to handlebars or whatever we use for actual pages
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

//Routes
require("./routes/login-routes.js")(app,passport);

//Sync and Start
db.sequelize.sync().then(function(){
	app.listen(PORT, function(){
		console.log("App listening on PORT " + PORT);
	});
});