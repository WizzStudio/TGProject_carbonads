const api = require('../requests/apis');

// const businessHandler = (req, res, next) => {
// 	api.getLinkByType('business', (err, foreignLinks, localLinks) => {
// 		if (err) return next(err);
// 		api.getPicByType('business', (err ,pics) => {
// 			if (err) return next(err);
// 			res.render('list', {
// 				title: '商业与产品',
// 				foreignLinks: foreignLinks,
// 				localLinks: localLinks,
// 				pics: pics
// 			});
// 		});
// 	});
// }

// const designHandler = (req, res, next) => {
// 	api.getLinkByType('design', (err, foreignLinks, localLinks) => {
// 		if (err) return next(err);
// 		api.getPicByType('design', (err ,pics) => {
// 			if (err) return next(err);
// 			res.render('list', {
// 				title: '设计',
// 				foreignLinks: foreignLinks,
// 				localLinks: localLinks,
// 				pics: pics
// 			});
// 		});
// 	});
// }

// const devHandler = (req, res, next) => {
// 	api.getLinkByType('dev', (err, foreignLinks, localLinks) => {
// 		if (err) return next(err);
// 		api.getPicByType('dev', (err ,pics) => {
// 			if (err) return next(err);
// 			res.render('list', {
// 				title: '开发',
// 				foreignLinks: foreignLinks,
// 				localLinks: localLinks,
// 				pics: pics,
// 			});
// 		});
// 	});
// }

const cates = {
	business: '商业与产品',
	design: '设计',
	dev: '开发'
};

const Handler = (req, res, next) => {
	let path = req.path.split('/');
	let category = path[path.length-1];
	api.getLinkByCategory(category, (err, foreignLinks, localLinks, pics) => {
		if (err) return next(err);
		res.locals.title = cates[category];
		res.locals.foreignLinks = foreignLinks;
		if (JSON.stringify(localLinks).length > 3)
			res.locals.localLinks = localLinks;
		res.locals.pics = pics;
		res.render('list');
	});
}

module.exports = Handler;

// exports.businessHandler = businessHandler;
// exports.designHandler = designHandler;
// exports.devHandler = devHandler;