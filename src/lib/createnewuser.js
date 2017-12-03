const mongoose = require('mongoose');
const User = require('../model/user');

/**
 * 管理员用户信息
 */
const data = [
	{
		name: 'admin',
		pass: 'admin'
	},
];

/**
 * mongodb database
 */
mongoose.connect('mongodb://localhost/tginfo', {useMongoClient: true});
const db = mongoose.connection;
db.on('error', (err) => {console.log(err)});
db.on('open', () => {console.log('open mongodb successfully');});

data.forEach((info) => {
	User.save(info, (err, user) => {
		if (err) return console.log(err);
		console.log(user);
	});	
});

setTimeout(() => {
	process.exit(0);
}, 2000);
