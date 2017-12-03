function parseField(field) {
	return field.split(/\[|\]/).filter(function(s) {return s});
}
function getField(req, field) {
	let val = req.body;
	field.forEach(function(prop) {
		val = val[prop];
	});
	return val;
}
/**
 * 必填项验证
 * @param field 必填项
 */
const required = (field) => {
	field = parseField(field);
	return (req, res, next) => {
		if (getField(req, field)) {
			next();
		} else {
			res.error(field.join(' ')+' is required.');
			res.redirect('back');
		}
	}
}
/**
 * 最短长度限制
 * @param field 限制项
 * @param len 限制长度
 */
const lengthAbove = (field, len) => {
	field = parseField(field);
	return function(req, res, next) {
		if (getField(req, field).length > len) {
			next();
		} else {
			res.error(field.join(' ')+' must have more than '+len+' characters');
			res.redirect('back');
		}
	}
}
/**
 * 验证是否为邮箱
 */
const verifyEmail = () => {
	return (req, res, next) => {
		let dot = 0;
		let at = 0;
		for (let c of getField(req, ['emailAddress'])) {
			if (c == '@') at++;
			if (at == 1 && c == '.') dot++;
		}
		if (at == 1 && dot) {
			next();
		} else {
			res.error('邮箱地址不正确。');
			res.redirect('back');
		}
	}
}

module.exports = {
	lengthAbove: lengthAbove,
	required: required,
	verifyEmail: verifyEmail
}