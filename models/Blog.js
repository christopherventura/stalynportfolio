const mongoose = require('mongoose')


const blogSchema = new mongoose.Schema({
	title: {
		required: true,
		type: String
	},
	body: String,
	created_at: {
		type: Date,
		default: Date.now()
	},
	category: [{
			slug: String,
			name: String
		}],
	tags: Array,
	author: String,
	thumbnail: String,
	slug: {
		unique: true,
		type: String,
		required: true
	}
})

module.exports = mongoose.model('Blog', blogSchema)
