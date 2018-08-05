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
			res.render('articles', {
				title: 'Articles',
				articles: articles,
				categories: categories
			});
		});
	});
});

router.get('/show/:id', (req, res, next) => {
	const queryId = {_id: req.params.id};

	Article.findArticle(queryId, (err, article) => {
		Category.getCategories((err, categories) => {
			if(err){
				console.log(err);
			}
			res.render('article', {
				title: article.title,
			  	article: article,
			  	categories: categories,
			  	errors: null
			});
		});
	});
});

router.get('/categories/:category_id', (req, res, next) => {
	const queryId = {_id: req.params.category_id};

	Category.findCategory(queryId, (err, category) => {
		const queryString = {category: category.title};
		Article.filterArticles(queryString, (err, articles) => {
			console.log(articles);
			Category.getCategories((err, categories) => {
				if(err){
					console.log(err);
				}
				res.render('articles', {
					articles: articles,
					title: category.title + ' articles',
					categories: categories,
					category: category.title
				});
			});
		});
	});
});

router.post('/comment/add/:id', (req, res, next) => {
	const queryId = {_id: req.params.id};
	const comment = {
		title: req.body.title, 
		body: req.body.body,
		author: req.body.author,
		email: req.body.email
	};

	Article.updateArticle(queryId, {$push: {comments: comment}}, (err, comment) => {
		if(err){
			console.log(err);
		}
		res.redirect('/articles');
	});
});

module.exports = router;
