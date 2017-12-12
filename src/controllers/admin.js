const express = require('express');
const User = require('../model/user');
const Link = require('../model/link');
const formidable = require('formidable');
const {required} = require('../lib/middlewares/verify');
const path = require('path');
const fs = require('fs');
const api = require('../requests/apis');
const events = require('events').EventEmitter;

const router = express.Router();
module.exports = router;

const event = new events();

router.post('/login', 
	required('name'),
	required('pass'),
	loginHandler
);
router.use(checkLoginStatus);
router.get('/', adminIndexHandler);
router.post('/post', linkPostHandler);
router.post('/logout', logoutHandler);
router.get('/list', listHandler);
router.get('/link/:id', linkDeleteHandler);

function adminIndexHandler(req, res, next) {
	res.locals.title = 'Admin';
	res.render('admin');
}

function loginHandler(req, res, next) {
	User.authenticate(req.body, (err, user) => {
		console.log(req.body);
		if (err) return next(err);
		if (!user) {
			res.error('输入信息有误。');
			res.redirect('back');
		} else {
			req.session.uid = user._id;
			res.redirect('back');
		}
	});
}


function linkPostHandler(req, res, next) {
	let form = new formidable.IncomingForm();
	form.parse(req, function(err, fields, files) {
		if (fields.isPic) {
			let oldPath = files.picture.path;
			let newPath = path.join(__dirname, '../../public/img/'+fields.category+'/'+fields.title+'.jpg');
			fs.rename(oldPath, newPath, function (err) {
				if (err) return next(err);
				fields.src = '/img/'+fields.category+'/'+fields.title+'.jpg'
				Link.save(fields, (err, link) => {
					if (err) return next (err);
					res.redirect('/admin');
				});
			});
		} else {
			Link.save(fields, (err, link) => {
				if (err) return next (err);
				res.redirect('/admin');
			});
		}
	});	
}

function logoutHandler(req, res, next) {
	req.session.uid = undefined;
	res.redirect('/admin');
}

function listHandler(req, res, next) {
	let categories = ['business', 'design', 'dev'];
	let list = {};
	let eventCount = 0;
	categories.forEach((category) => {
		list[category] = {};
		api.getLinkByCategory(category, (err, foreignLinks, localLinks, pics) => {
			if (err) return next(err);
			list[category].foreignLinks = foreignLinks;
			if (JSON.stringify(localLinks).length > 3)
				list[category].localLinks = localLinks;
			list[category].pics = pics;
			eventCount++;
			if (eventCount == 3) event.emit('response');
		});	
	});
	event.once('response', ()=>{
		res.locals.list = list;
		res.locals.title = '所有文章列表';
		res.render('adminlist');
	});
}

function linkDeleteHandler(req, res, next) {
	let id = req.params.id;
	Link.remove({_id: id}, (err) => {
		if (err) return next(err);
		res.redirect('/admin/list')
	});
}

function checkLoginStatus(req, res, next) {
	if (!req.session.uid) {
		res.locals.title = '登录';
		res.render('adminlogin');
	} else {
		next();
	}
}