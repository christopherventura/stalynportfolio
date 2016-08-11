const Video = require('../models/Video')

module.exports.getVideos = (req, res, next) => {
	Video.find((err, videos) => {
		if(err) res.json({err: err})
		if(videos) res.json(videos)
		else res.json({
			err: 'No videos found.'
		})
	})
}

module.exports.getSingleVideo = (req, res, next) => {
	Video.findOne({
		slug: req.params.slug
	}, (err, video) => {
		if(err) res.json({err: err})
		if(video) res.json(video)
		else res.json({
			err: `No video found with slug ${req.params.slug}.`
		})
	})
}


module.exports.getCategory = (req, res, next) => {
	Video.find({
		'category.slug': req.params.category
	}, (err, videos) => {
		if(err) res.json({err: err})
		if(videos) res.json(videos)
		else res.json({
			err: `No videos founds with category ${req.params.category}.`
		})
	})
}


module.exports.postSingleVideo = (req, res, next) => {

}

module.exports.getTag = (req, res, next) => {

}

module.exports.getAuthor = (req, res, next) => {
	Video.find({
		author: req.params.author
	}, (err,videos) => {
		if(err) res.json({err: err})
		if(videos) res.json(videos)
		else res.json({
			err: `No videos found with author ${req.params.author}`
		})
	})
}
