const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
	title: {
		type: String
	},
	subtitle: {
		type: String
	},
	category: {
		type: String
	},
	body: {
		type: String
	},
	author: {
		type: String
	},
	created_date: {
		type: Date,
		default_date: Date.now
	},
	comments: [{
		title: {
			type: String
		},
		body: {
			type: String
		},
		author: {
			type: String
		},
		email: {
			type: String
		},
		created_date: {
			type: Date,
			default_date: Date.now
		}
	}]
});

const Article = module.exports = mongoose.model('Article', articleSchema);


// Get all articles
module.exports.getArticles = (callback, limit) => {
	Article.find(callback).limit(limit);
};

// Filter Articles
module.exports.filterArticles = (filter, callback) => {
	Article.find(filter, callback);
}

// Add an Article
module.exports.addArticle = (article, callback) => {
	Article.create(article, callback);
}

// Find an article
module.exports.findArticle = (id, callback) => {
	Article.findOne(id, callback);
}

// Delete an article
module.exports.deleteArticle = (id, callback) => {
	Article.findOneAndDelete(id, callback);
};

// Find and update article
module.exports.updateArticle = (id, update, callback) => {
	Article.updateOne(id, update, callback);
}
