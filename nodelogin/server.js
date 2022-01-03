const mysql = require('mysql');
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const passport = require('passport');
const ejs = require('ejs');
const mongoose = require('mongoose');
// https://dev.to/dalalrohit/how-to-connect-to-mongodb-atlas-using-node-js-k9i
const mongoose = require('mongodb');
const { connect } = require('http2');

var connection = mysql.createConnection({
    // change these values to your own
	host     : 'localhost',
	user     : 'root',
	password : '',
	database : 'nodelogin'
});

const uri = process.env.MONGO_URL;
mongoose.connect(uri, {useNewUrlParser: true}).then(() => {}).catch((err) => console.log(err));


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

// Authentication Page?
app.post('/auth', function(request, response) {
	var username = request.body.username;
	var password = request.body.password;
	if (username && password) {
		connection.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
			if (results.length > 0) {
				request.session.loggedin = true;
				request.session.username = username;
				response.redirect('/home');
			} else {
				response.send('Incorrect Username and/or Password!');
			}			
			response.end();
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
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