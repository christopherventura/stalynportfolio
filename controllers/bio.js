const Bio = require('../models/Bio')


module.exports.getBio = (req, res, next) => {
	Bio.findOne({}).exec((err, bio) => {
		if(err) res.json({err: err})
		if(bio) res.json(bio)
		else res.json({
			err: 'Biography not found.'
		})
	})
}

module.exports.postBio = (req, res, next) => {
	req.assert('name', 'Name is required!').notEmpty()
	req.assert('body', 'About is required!').notEmpty()
	req.assert('avatar', 'Avatar is required!').notEmpty()

	const errs = req.validationErrors()
	if(errs){
		return res.json({err: errs})
	}
	let newbio = new Bio({
				name: req.body.name,
				body: req.body.body,
				avatar: req.body.avatar
			})

	Bio.findOne({}).exec((err, bio) => {
		if(bio){
			bio.name = newbio.name
			bio.body = newbio.body
			bio.avatar = newbio.avatar
			bio.save().then(() => {
				return res.json({
					bio: bio,
					info: 'Biography Updated.'
				})
			})
		} else {
			newbio.save().then(() => {
					return res.json({
						bio: bio,
						info: 'Biography Published.'
					})
			})
		}
	})
}


