var express = require('express');
var router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/User');

function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		req.flash('error', 'You must be logged in');
		res.redirect('/login');
	}
}


/* GET home page. */
router.get('/', function(req, res, next) {
	Category.getCategories((err, categories) => {
		res.render('login', { 
		  	title: 'Login',
		  	errors: null,
		  	categories: categories,
			isAuthenticated: req.isAuthenticated()
		});
	});
});

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	User.getUserById(id, (err, user) => {
		done(err, user);
	});
});

// Create a local strategy
passport.use(new LocalStrategy((username, password, done) => {
	User.getUserByUsername(username, (err, user) => {
		if(err) throw err;
		if(!user){
			return done(null, false, {message: 'Username is incorrect'});
		}
		User.comparePasswords(password, user.password, (err, isMatch) => {
			if(err) throw err;
			if(isMatch){
				return done(null, user);
			} else {
				return done(null, false, {message: 'Password is incorrect'});
			}
		});
	});
}));

// Login Post request

router.post('/submit', (req, res, next) => {
	passport.authenticate('local', {
		successRedirect: '/',
		failureRedirect: '/login',
		failureFlash: true
	})(req, res, next);
});



module.exports = router;
