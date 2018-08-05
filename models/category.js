const mongoose = require('mongoose');


const categorySchema = new mongoose.Schema({
	title: {
		type: String
	},
	description: {
		type: String
	}
});

const Category = mongoose.model('Category', categorySchema);
module.exports = Category;

// Get all categories
module.exports.getCategories = (callback, limit) => {
	Category.find(callback).limit(limit);
}

// Get a specific category
module.exports.findCategory = (id, callback) => {
	Category.findOne(id, callback);
}

// Add a category
module.exports.addCategory = (category, callback) => {
	Category.create(category, callback);
}

// Delete a category
module.exports.deleteCategory = (id, callback) => {
	Category.findOneAndDelete(id, callback);
}

// Find and update a Category
module.exports.updateCategory = (id, update, callback) => {
	Category.updateOne(id, update, callback);
};