const Category = require('../models/Category')

module.exports.getSingleCategory = (req, res, next) => {
	Category.findOne({
		slug: req.params.slug
	}).exec( (err, cats) => {
		if(err) res.json({err: err})
		if(cats) res.json(cats)
		else res.json({
			err: `No category found with slug ${req.params.slug}.`
		})
	})
}

module.exports.postSingleCategory = (req, res, next) => {
	req.assert('name', 'Name is required').notEmpty()
	req.assert('type', 'Type is required').notEmpty()

	const errs = req.validationErrors()
	if(errs){
		return res.json({
			err: errs
		})
	}

	const slug = req.body.name.toLowerCase().replace(/\ /g,'-')
	let newcat = new Category({
		name: req.body.name,
		slug: slug,
		type: req.body.type
	})
	newcat.save().then(
		() => {
			Category.find({type: req.body.type })
				.exec( (err, cats) => {
					return res.json(cats)
				})
			}
	)
}

module.exports.deleteSingleCategory = (req, res, next) => {
	Category.findOne({slug: req.body.slug, type: req.body.type})
		.exec((err, cat) => {
			if(cat){cat.remove()
							.then((categorySaved) => {
								Category.find({type: req.body.type})
									.exec((err, cats) => {
										return res.json(cats)
									})
						} )
			} else {
				return res.json({
					err: `No category found with slug ${req.body.slug} in ${req.body.type}.`
				})
			}
		})
}


module.exports.getCategories = (req, res, next) => {
	Category.find({}).exec((err, cats) => {
		if(err) res.json({err: err})
		if(cats) res.json(cats)
		else res.json({
			err: `No categories found.`
		})
	})
}

module.exports.getType = (req, res, next) => {
	Category.find({
		type: req.params.type
	}).exec( (err, cats) => {
		if(err) res.json({err: err})
		if(cats) res.json(cats)
		else res.json({
			err: `No categories found with type ${req.params.type}.`
		})
	})
}
