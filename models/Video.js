const mongoose = require('mongoose')

const videoSchema = new mongoose.Schema({
	title: String,
	video_url: String,
	description: String,
	created_at: {
		type: Date,
		default: Date.now
	},
	category: {
		slug: String,
		name: String
	},
	tags: Array,
	thumbnail: String,
	author: String,
	slug: {
		type:String,
		unique: true,
		required: true
	}
})

module.exports = mongoose.model('Video', videoSchema)
