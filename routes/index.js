var express = require('express');
var router = express.Router();

Article = require('../models/Article.js');
Category = require('../models/Category.js');

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
				categories: categories
			});
		});
	});
});
module.exports = router;
