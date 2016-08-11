const Blog = require('../models/Blog')


module.exports.getPosts = (req, res, next) => {
	Blog.find({}).sort({
		created_at: -1
	}).exec( (err, posts) => {
		if(err) res.json({err: err})
		if(posts) res.json(posts)
		else res.json({
			err: 'No posts Found.'
		})
	})
}

module.exports.getSinglePost = (req, res, next) => {
	Blog.findOne({
		slug: req.params.slug
	}, (err, post) => {
		if(err) res.json({err: err})
		if(post) res.json(post)
		else res.json({
			err: `Not found post with slug ${req.params.slug}.`
		})
	})
}


module.exports.getCategory = (req, res, next) => {
	Blog.find({
		'category.slug': req.params.category
	}, (err, posts) => {
		if(err) res.json({err: err})
		if(posts) res.json(posts)
		else res.json({
			err: `Not posts found with category ${req.params.category}.`
		})
	})
}

module.exports.postSinglePost = (req, res, next) => {
	newblog = new Blog({
		title: req.body.title,
		body: req.body.body,
		category: req.body.categories || req.body.category,
		author: req.body.author,
		thumbnail: req.body.thumbnail,
		slug: req.body.slug,
		tags: req.body.tags
	})
	Blog.findOne({
		slug: req.body.slug
	}).exec( (err, post) => {
		if(post){
			post.title = newblog.title
			post.body = newblog.body
			post.category = newblog.category
			post.author = newblog.author
			post.thumbnail = newblog.thumbnail
			post.slug = newblog.slug
			post.tags = newblog.tags
			post.save( () => {
				return res.json({
					post: post,
					info: 'Post Updated.'
				})
			})
		} else {
			newblog.save().then(() => {
				return res.json({
					post: newblog,
					info: 'Post Published.'
				})
			})
		}
	})
}

module.exports.removeSinglePost = (req, res, next) => {
	req.assert('slug', 'Slug is required!.').notEmpty()
	const errs = req.validationErrors()
	if(errs){
		return res.json({
			err: errs
		})
	}
	Blog.findOne({
		slug: req.body.slug
	}, (err, post) => {
		if(post){
			post.remove().then((post) => {
				Blog.find({}).exec(
					(err, posts) => {
						if(posts){
							return res.json(posts)
						} else {
							return res.json({
								err: err
							})
						}
					})
			})
		} else {
			res.json({
				err: `No post with slug ${req.body.slug} for remove.`
			})
		}
	})
}

module.exports.getTag = (req, res, next) => {

}

module.exports.getAuthor = (req, res, next) => {
	Blog.find({
		author: req.params.author
	}, (err, posts) => {
		if(err) res.json({err: err})
		if(posts) res.json(posts)
		else res.json({
			err: `No posts found with author ${req.params.author}`
		})
	})
}
