const Design = require('../models/Design')


module.exports.getDesigns = (req, res, next) => {
	Design.find((err, designs) => {
		if(err) res.json({err: err})
		if(designs) res.json(designs)
		else res.json({
			err: 'No designs found.'
		})
	})
}


module.exports.getSingleDesign = (req, res, next) => {
	Design.findOne({
		slug: req.params.slug
	}, (err, design) => {
		if(err) res.json({err: err})
		if(design) res.json(design)
		else res.json({
			err: `Not post found with slug ${req.params.slug}.`
		})
	})
}

module.exports.getCategory = (req, res, next) => {
	Design.find({
		'category.slug': req.params.category
	}, (err, designs) => {
		if(err) res.json({err: err})
		if(designs) res.json(designs)
		else res.json({err: `Not posts found with category ${req.params.category}.`})
	})
}

module.exports.postSingleDesign = (req, res, next) => {

}


module.exports.getTag = (req, res, next) => {

}

module.exports.getAuthor = (req, res, next) => {
	Design.find({
		author: req.params.author
	}, (err,designs) => {
		if(err) res.json({err: err})
		if(designs) res.json(designs)
		else res.json({
			err: `No designs found with author ${req.params.author}`
		})
	})
}
