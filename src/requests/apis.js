const Link = require('../model/link');

const getLinkByCategory = (cate, callback) => {
	Link.findByCategory(cate, (err, links) => {
		if (err) return callback(err);
		if (!links) return callback();
		let foreign = [];
		let local = {};
		let pic = [];
		links.forEach((link) => {
			if (link.isPic) {
				pic.push(link);
			} else if(!link.isLocal) {
				foreign.push(link);
			} else {
				let tag = link.tag;
				if (local[tag] == undefined) local[tag] = [];
				local[tag].push(link);
			}
		});
		callback(null, foreign, local, pic);
	});
};

exports.getLinkByCategory = getLinkByCategory;
