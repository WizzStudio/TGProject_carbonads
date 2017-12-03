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
		default: false,
		require: true,
	}, 
	category: {
		type: String,
		require: true
	},
	tag: {
		type: String,
		require: true
	},
	isLocal: {
		type: Boolean,
		require: true
	},
	createdDate: {
		type: Date,
		default: Date.now
	}
});
LinkSchema.statics.save = (data, callback) => {
	let link = new Link(data);
	link.save(callback);
};
LinkSchema.statics.findByCategory = (category, callback) => {
	Link.find({category: category}, {}, {sort: {createdDate: -1}}, callback);
}

const Link = mongoose.model('Link', LinkSchema);
module.exports = Link;