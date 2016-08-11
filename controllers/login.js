const User = require('../models/User')
const jwt = require('jwt-simple')
const moment = require('moment')
const config = require('../config')

function createToken(user){
	let payload = {
		sub: user._id,
		iat: moment().unix(),
		exp: moment().add(14,'days').unix()
	}
	return jwt.encode(payload, config.globals.APP_SECRET)
}
module.exports.createToken = createToken

function isAuthenticated(req, res, next) {
	if(!req.headers.authorization){
		res.json({
			err: 'No logged in.'
		})
	} else {
		let token = req.headers.authorization
		let payload = jwt.decode(token, config.globals.APP_SECRET)
		if(payload.exp <= moment().unix()){
			return res.json({
				err: 'Expired Token.'
			})
		} else {
			req.user = payload.sub
			return next()
		}
	}
}

module.exports.isAuthenticated = isAuthenticated


module.exports.postLogin = (req, res, next) => {
	req.assert('username', 'Username is requied.').notEmpty()
	req.assert('password', 'Password is required.').notEmpty()

	const errs = req.validationErrors()
	if(errs){
		res.json({
			err: errs
		})
	}

	User.findOne({
		user: req.body.username.toLowerCase()
	}, (err, user) => {
		if(err) res.json({err: err})
		if(user){
			user.comparePassword(req.body.password, (err, isMatch) => {
				if(err) res.json({err: err})
				if(isMatch){
					req.session.user_id = user._id
					res.json({
						user: user,
						token: createToken(user)
					})
				}
				else res.json({
					err: 'Invalid Username or Password.'
				})
			})
		}
		else res.json({
			err: 'Invalid Username or Password.'
		})
	})
}
