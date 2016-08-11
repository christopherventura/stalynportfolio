const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
	name: String,
	slug: {
		type: String,
		required: true
	},
	type: String
})


module.exports = mongoose.model('Category', categorySchema)
