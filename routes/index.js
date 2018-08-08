var express = require('express');
var router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

Article = require('../models/Article.js');
Category = require('../models/Category.js');

function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		req.flash('error', 'You must be logged in');
		res.redirect('/login');
	}
}

// Articles Section
router.get('/', (req, res, next) => {
	Article.getArticles((err, articles) => {
		Category.getCategories((err, categories) => {
			if(err){
				console.log(err);
			}
			console.log(categories);
			res.render('index', {
				title: 'Home',
				articles: articles,
				categories: categories,
				errors: null,
				isAuthenticated: req.isAuthenticated()
			});
		});
	});
});

router.get('/logout', (req, res, next) => {
	req.logout();
	req.flash('success', 'You are logged out');
	res.redirect('/login');
});

module.exports = router;
