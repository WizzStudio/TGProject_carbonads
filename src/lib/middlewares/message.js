/**
 * 登录、注册等验证之后，重定向后，错误信息就会丢失
 * session在重定向后仍保留
 * 利用session完成重定向返回错误信息
 */
const express = require('express');
const res = express.response;

res.pushMessage = function(type, message) {
	type = type || info;
	let sess = this.req.session;
	sess.messages = sess.messages || [];
	sess.messages.push({type: type, body: message});
}

res.error = function(message) {
	return this.pushMessage('danger', message);
}

module.exports = (req, res, next) => {
	res.locals.messages = req.session.messages || [];
	req.session.messages = [];
	next();
}