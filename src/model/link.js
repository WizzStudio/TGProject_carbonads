const mongoose = require('mongoose');

const LinkSchema = mongoose.Schema({
	title: {
		type: String,
		require: true
	},
	href: {
		type: String,
		require: true
	},
	src: {
		type: String,
	},
	isPic: {
		type: Boolean,
		require: true
	}, 
	category: {
		type: String,
		require: true
	},
	tag: {
		type: String,
	},
	isLocal: {
		type: Boolean,
		require: true
	}
});
LinkSchema.statics.save = (data, callback) => {
	let link = new Link(data);
	link.save(callback);
};
LinkSchema.statics.findByCategory = (category, callback) => {
	Link.find({category: category}, {}, {}, callback);
}

const Link = mongoose.model('Link', LinkSchema);
module.exports = Link;