//Dependencies
var express = require('express');
var passport = require('passport');
var Strategy = require('passport-local').Strategy;
var bodyParser = require("body-parser");
var flash = require("connect-flash");
var db = require("./models");

//Passport Configuration
passport.use(new Strategy({
        passReqToCallBack: true
    },
    function(username, password, cb) {
        db.Member.findOne({ where: { username: username } }).then(function(user) {
            if (!user) {
                return cb(null, false, { message: "Invalid Username." });
            }
            user.checkPassword(password, function(err, res) {
                if (err || !res) {
                    return cb(null, false, { message: "Invalid Password." });
                } else {
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
    db.Member.findOne({ where: { id: id } }).then(function(user) {
        cb(null, user);
    });
});

//Express Configuration
var app = express();

var PORT = process.env.PORT || 8081;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
app.use(flash());

app.use(express.static("./public"));

app.use(passport.initialize());
app.use(passport.session());

//Using EJS for testing that logins work, switch to handlebars or whatever we use for actual pages
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

//Routes
require("./routes/login-routes.js")(app, passport);
require("./routes/post-routes.js")(app, passport);



// =======================================================
var http = require('http').Server(app);
var io = require('socket.io')(http);
io.on('connection', function(socket) {
    var user;
    socket.on('status', function(userid) {
        user = userid;
        db.User.findAll({ where: { online: true } }).then(function(data) {
            io.emit('online' + user, data);
        });
        db.User.update({ online: true }, {
            where: { MemberId: user }
        });
    });
    socket.on('info', function(msg) {
        db.User.findOne({ where: { id: msg.userReq  } }).then(function(data) {
            io.emit(msg.from, data);
        })
    });


    socket.on('Message', function(msg) {
      console.log(msg);
      io.emit(msg.reciever);
    })

    socket.on('disconnect', function(msg) {
        db.User.update({ online: false }, {
            where: { MemberId: user }
        });
        db.User.findAll({ where: { online: true } }).then(function(data) {
            io.emit('online' + user, data);
        });
    });
});

// ======================================================




//Sync and Start
db.sequelize.sync().then(function() {
    // now http.listen so that socket.io can work
    http.listen(PORT, function() {
        console.log("App listening on PORT " + PORT);
    });
});
