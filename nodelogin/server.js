const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const passport = require('passport');
const ejs = require('ejs');

// Connecting to the Spotify API
const SpotifyWebApi = require('spotify-web-api-node');

// Connecting to MongoDB
const { client, register } = require("./db");

// https://dev.to/dalalrohit/how-to-connect-to-mongodb-atlas-using-node-js-k9i

var app = express();

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

//static files
app.use(express.static('./public'));

//ejs
app.set("view engine", "ejs");

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Login Page
app.get('/', function(request, response) {
	response.sendFile(path.join(__dirname + '/login.html'));
});

// Home Page
app.get('/home', function(request, response) {
	if (request.session.loggedin) {
		response.send('Welcome back, ' + request.session.username + '!');
	} else {
		response.send('Please login to view this page!');
	}
	response.end();
});

app.post("/register", function(req, res){

	// get the user data sent/posted from the front end
	const email = req.body.email;
	const name = req.body.name;
	const password = req.body.password;
	const confirm_password = req.body.confirm_password;

	// make sure passwords are the same
	if (password != confirm_password) {
		return res.json({error: "Passwords dont match"})
	}

	// Connect the user's spotify account before sending to the DB
	const spotify = req.body.spotify;
	
	// collect the userdata into a dictionary/object
	const userData = {
		  email: req.body.email,
		  username: req.body.username,
		  password: req.body.password,
		  spotify_acc: spotify
	}

	// use schema.create to insert data into the db
	User.create(userData, function (err, user) {
		// on error
		if (err) {
			return next(err)
		} else {
			return res.redirect('/home');
		}
	});
	

});

app.post("/login", function(req, res){


});

app.post("/logout", function(req, res){

});

// Error page
app.get("*", function(req, res){
    res.status(404).send("error");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`Server listening on port ${PORT}`));