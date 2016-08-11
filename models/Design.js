const mongoose = require('mongoose')

const designSchema = new mongoose.Schema({
	title: String,
	design_url: String,
	created_at: {
		type: Date,
		default: Date.now()
	},
	category: {
		name: String,
		slug: String
	},
	description: String,
	author: String,
	slug: {
		type: String,
		unique: true,
		required: true
	}
})

module.exports = mongoose.model('Design', designSchema)
