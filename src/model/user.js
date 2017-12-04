const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchame = mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	pass: {
		type: String,
		required: true,
	}
});
const saltRounds = 10;	

userSchame.statics.save = (data, callback) => {
	bcrypt.hash(data.pass, saltRounds, (err, hash) => {
		if (err) return callback(err);
		data.pass = hash;
		let user = new User(data);	
		user.save(callback);
	});
};
userSchame.statics.authenticate = (data, callback) => {
	User.findOne({name: data.name}, (err, user) => {
		if (err) return next(err);
		if (!user) return callback();
		bcrypt.compare(data.pass, user.pass, (err, succ) => {
			if (err) return callback(err);
			if (succ)
				callback(err, user);
			else 
				callback();
		});
	});
}

const User = mongoose.model('User', userSchame);
module.exports = User;