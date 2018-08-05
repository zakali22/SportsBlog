var express = require('express');
var router = express.Router();

//Require Categories model
Category = require('../models/Category.js');

/* GET categories page. */
router.get('/', function(req, res, next) {
	Category.getCategories((err, categories) => {
		console.log(categories);

		res.render("categories", {
		  title: "Categories",
		  categories: categories
		});
	});
});

module.exports = router;
