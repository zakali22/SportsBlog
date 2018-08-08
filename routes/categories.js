var express = require('express');
var router = express.Router();

//Require Categories model
Category = require('../models/Category.js');

function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		req.flash('error', 'You must be logged in');
		res.redirect('/login');
	}
}


/* GET categories page. */
router.get('/', function(req, res, next) {
	Category.getCategories((err, categories) => {
		console.log(categories);

		res.render("categories", {
		  title: "Categories",
		  categories: categories,
		  isAuthenticated: req.isAuthenticated(),
		  errors: null
		});
	});
});

module.exports = router;
