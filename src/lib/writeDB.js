const mongoose = require('mongoose');
const Link = require('../model/link');
const fs = require('fs');
const path = require('path');

let now = Date.now();
while (Date.now()-now < 1000) ;

/**
 * mongodb database
 */
mongoose.connect('mongodb://localhost/tginfo', {useMongoClient: true});
const db = mongoose.connection;
db.on('error', (err) => {console.log(err)});
db.on('open', () => {console.log('open mongodb successfully');});

const filePath = path.join(__dirname, "../data");
const names = ['business', 'design', 'dev'];
const type = ['foreign', 'local', 'pic'];

names.forEach((name) => {
	type.forEach((type) => {
		fs.readFile(filePath+'/'+name+'_'+type+'.txt', (err, data) => {
			if(err) {
				console.error(err);
				return;
			}
			data = JSON.parse(data);
			if (type == 'local') {
				for (let tag in data) {
					data[tag].forEach((link) => {
						link.tag = tag;
						link.isLocal = true;
						link.isPic = false;
						link.category = name;
						Link.save(link);
					});
				}
			} else if (type == 'foreign') {
				data.forEach((link) => {
					link.isLocal = false;
					link.isPic = false;
					link.category = name;
					Link.save(link);
				});
			} else {
				data.forEach((link) => {
					link.isLocal = false;
					link.isPic = true;
					link.picSrc
					link.category = name;
					Link.save(link);
				});
			}
		});
	});
});

setTimeout(() => {
	process.exit(0);
}, 1000);
