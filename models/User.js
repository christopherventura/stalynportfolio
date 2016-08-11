const mongoose = require('mongoose')
const bcrypt = require('bcrypt-nodejs')

const UserSchema = new mongoose.Schema({
	user: {
		type: String,
		unique: true,
		required: true
	},
	name: String,
	email: {
		type: String,
		unique: true,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	role: String,
	created_at: {
		type: Date,
		default: Date.now()
	},
	avatar: String
})


UserSchema.pre('save', function(next){
	const user = this
	bcrypt.genSalt(10, (err, salt) => {
		if(err) next(err)
		if(salt){
			bcrypt.hash(user.password, salt, null, (err, hash) => {
				if(err) next(err)
				user.password = hash
				next()
			})
		}
	})
})

UserSchema.methods.comparePassword = function(candidatePass, cb){
	bcrypt.compare(candidatePass, this.password, (err, isMatch) => {
		cb(err, isMatch)
	})
}

module.exports = mongoose.model('User', UserSchema)
