const mongoose = require('mongoose')

const bioSchema = new mongoose.Schema({
	name: {
		type: String,
		unique: true
	},
	body: String,
	avatar: String,
	created_at: {
		type: Date,
		default: Date.now()
	}
})

module.exports = mongoose.model('Bio', bioSchema)
