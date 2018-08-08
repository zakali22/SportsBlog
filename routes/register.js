var express = require('express');
var router = express.Router();

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
	  res.render('register', { 
	  	title: 'Registration',
	  	errors: null,
	  	categories: categories,
	  	isAuthenticated: req.isAuthenticated()
	  	});
	});
});

router.post('/add', (req, res, next) => {
	const name = req.body.name;
	const username = req.body.username;
	const email = req.body.email;
	const password = req.body.password;
	const confirm = req.body.confirm_password;

	req.checkBody('name', 'Name is required').notEmpty();
	req.checkBody('username', 'Userame is required').notEmpty();
	req.checkBody('email', 'Email is required').notEmpty();
	req.checkBody('email', 'Email must be valid').isEmail();
	req.checkBody('password', 'Password is required').notEmpty();
	req.checkBody('confirm_password', 'Password does not match').equals(req.body.password);

	let errors = req.validationErrors();
	console.log(errors);
	if(errors){
		Category.getCategories((err, categories) => {
			res.render('register', {
				title: 'Register',
				errors: errors,
				categories: categories,
				isAuthenticated: req.isAuthenticated()
			});
		});
	} else {
		const newUser = new User({
			name: name,
			username: username,
			email: email,
			password: password
		});

		User.registerUser(newUser, (err, user) => {
			if(err){
				console.log(err);
			}
			req.flash('success', 'Successfully registered');
			res.redirect('/login');
		});
	}
});
module.exports = router;
