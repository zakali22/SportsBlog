const express = require('express');
const router = express.Router();


Category = require('../models/Category.js');
Article = require('../models/Article.js');
User = require('../models/User');

function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		req.flash('error', 'You must be logged in');
		res.redirect('/login');
	}
}
// Articles Section

router.get('/articles', ensureAuthenticated, (req, res, next) => {
	Article.getArticles((err, articles) => {
		Category.getCategories((err, categories) => {
			res.render('manage_articles', {
				title: 'Manage Articles',
				articles: articles,
				categories: categories,
				flash: null,
				isAuthenticated: req.isAuthenticated()
			});
		});
	});
});


router.get('/articles/add',  ensureAuthenticated, (req, res, next) => {
  	Category.getCategories((err, categories) => {
		res.render('add_article', {
			title: 'Add Article',
			categories: categories,
			errors: null,
			isAuthenticated: req.isAuthenticated()
		});
	});
});

router.get('/articles/edit/:id',  ensureAuthenticated, (req, res, next) => {
	const queryId = {_id: req.params.id};

	Article.findArticle(queryId, (err, article) => {
		if(err){
			console.log(err);
		}

		Category.getCategories((err, categories) => {
			res.render('edit_article', {
				title: 'Edit Article ',
				article: article,
				categories: categories,
				isAuthenticated: req.isAuthenticated()
			});
		});
	});
});

router.post('/articles/edit/:id', (req, res, next) => {
	const queryId = {_id: req.params.id};
	const article = {
		title: req.body.title,
		subtitle: req.body.subtitle,
		category: req.body.category,
		body: req.body.body,
		author: req.body.author
	};

	Article.updateArticle(queryId, {$set: article}, (err, article) => {
		if(err){
			console.log(err);
		}
		console.log(article.created_date);
		req.flash('success', 'Article edited');
		res.redirect('/manage/articles');
	});
});

router.post('/articles/add',(req, res, next) => {
	req.checkBody('title', 'Title is required').notEmpty();
	req.checkBody('author', 'Author is required').notEmpty();
	req.checkBody('body', 'Body is required').notEmpty();
	let errors = req.validationErrors();

	if(errors){
		Category.getCategories((err, categories) => {
			res.render('add_article', {
				title: 'Add Article',
				categories: categories,
				errors: errors,
				isAuthenticated: req.isAuthenticated()
			});
		});
	} else {
		let article = new Article;
		article.title = req.body.title;
		article.subtitle = req.body.subtitle;
		article.category = req.body.category;
		article.body = req.body.body;
		article.author = req.body.author;

		Article.addArticle(article, (err, article) => {
			if(err){
				console.log(err);
			}
			req.flash('success', 'Article added');
			res.redirect('/manage/articles');
		});
	}

});

router.delete('/articles/delete/:id', (req, res, next) => {
	const queryId = {_id: req.params.id};

	Article.deleteArticle(queryId, (err, article) => {
		if(err){
			console.log(err);
		}
		req.flash('success', 'Article deleted');
		res.send(200);
	});
});

// Category Section

router.get('/categories', ensureAuthenticated, (req, res, next) => {
	Category.getCategories((err, categories) => {
		res.render('manage_categories', {
			title: 'Manage Categories',
			categories: categories,
			isAuthenticated: req.isAuthenticated()
		});
	});
});

router.get('/categories/add',  ensureAuthenticated, (req, res, next) => {
	Category.getCategories((err, categories) => {
		res.render('add_category', {
			title: 'Add Category',
			categories: categories,
			isAuthenticated: req.isAuthenticated(),
			errors: null
		});
	});
});


router.get('/categories/edit/:id', ensureAuthenticated, (req, res, next) => {
	const queryId = {_id: req.params.id};

	Category.findCategory(queryId, (err, category) => {
		if(err){
			console.log(err);
		}
		console.log(category);
		res.render('edit_category', {
			title: 'Edit ' + category.title + ' Category ',
			category: category,
			isAuthenticated: req.isAuthenticated()
		});
	});
});


router.post('/categories/add', (req, res, next) => {
	req.checkBody('title', 'Title is required').notEmpty();
	req.checkBody('description', 'Description is required').notEmpty();
	let errors = req.validationErrors();

	if(errors){
		Category.getCategories((err, categories) => {
			res.render('add_category', {
				title: 'Add Category',
				categories: categories,
				errors: errors,
				isAuthenticated: req.isAuthenticated()
			});
		});
	} else {
		let category = new Category;
		category.title = req.body.title;
		category.description = req.body.description;

		Category.addCategory(category, (err, categories) => {
			if(err){
				console.log(err);
			}
			console.log(categories);
			res.redirect('/manage/categories');
		});
	}
});

router.post('/categories/edit/:id', (req, res, next) => {
	const queryId = {_id: req.params.id};
	const category = {
		title: req.body.title,
		description: req.body.description
	};

	Category.updateCategory(queryId, {$set: category}, (err, category) => {
		if(err){
			console.log(err);
		}
		res.redirect('/manage/categories');
	});
});

router.delete('/categories/delete/:id', (req, res, next) => {
	const queryId = {_id: req.params.id};
	console.log(queryId);
	Category.deleteCategory(queryId, (err, category) => {
		if(err){
			console.log(err);
		}
		res.send(200);
	});
});




module.exports = router;
