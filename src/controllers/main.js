const api = require('../requests/apis');

const businessHandler = (req, res, next) => {
	api.getLinkByType('business', (err, foreignLinks, localLinks) => {
		if (err) return next(err);
		api.getPicByType('business', (err ,pics) => {
			if (err) return next(err);
			res.render('list', {
				title: 'Business',
				foreignLinks: foreignLinks,
				localLinks: localLinks,
				pics: pics
			});
		});
	});
}

const designHandler = (req, res, next) => {
	api.getLinkByType('design', (err, foreignLinks, localLinks) => {
		if (err) return next(err);
		api.getPicByType('design', (err ,pics) => {
			if (err) return next(err);
			res.render('list', {
				title: 'Design',
				foreignLinks: foreignLinks,
				localLinks: localLinks,
				pics: pics
			});
		});
	});
}

const devHandler = (req, res, next) => {
	api.getLinkByType('dev', (err, foreignLinks, localLinks) => {
		if (err) return next(err);
		api.getPicByType('dev', (err ,pics) => {
			if (err) return next(err);
			res.render('list', {
				title: 'Dev',
				foreignLinks: foreignLinks,
				localLinks: localLinks,
				pics: pics,
			});
		});
	});
}

exports.businessHandler = businessHandler;
exports.designHandler = designHandler;
exports.devHandler = devHandler;