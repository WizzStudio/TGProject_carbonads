// const fs = require('fs');
// const path = require('path');
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

	// foreignFilePath = path.join(__dirname, "../data/"+type+'_foreign.txt');
	// localFilePath = path.join(__dirname, "../data/"+type+'_local.txt');
	// fs.readFile(foreignFilePath, (err, foreign) => {
	// 	if (err) return callback(err);
	// 	fs.readFile(localFilePath, (err, local) => {
	// 		if (err) return callback(err);
	// 		foreign = JSON.parse(foreign);
	// 		local = local.length > 3 ? JSON.parse(local) : null;
	// 		callback(err, foreign, local);
	// 	});
	// });
// };

// const getPicByType = (type, callback) => {
// 	filePath = path.join(__dirname, "../data/"+type+'_pic.txt');
// 	fs.readFile(filePath, (err, data) => {
// 		if (err) return callback(err);
// 		data = JSON.parse(data);
// 		callback(err, data);
// 	});
// };

// exports.getPicByType = getPicByType;
exports.getLinkByCategory = getLinkByCategory;
