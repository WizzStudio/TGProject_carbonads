/**
 * Created by Acery on 2017/7/23.
 */
/* 常用工具函数
 * @author Acery
 * @version 0.0.4
 * @mention: 拆分完成，要补充功能
 */

/**
 * 循环计数器
 * @param countTime 计数次数
 * @param basicMs   单位计数间隔
 * @param progressFn  单位计数触发函数
 * @param callBackFn  计数完成回调函数
 */
const countFn = (countTime, basicMs, progressFn, callBackFn) => {
	for (let i = 0; i < countTime; ++i) {
		((j = i) => {
			setTimeout(() => {
				if (i === 0) {
					console.log("count start!")
				}
				if (i == countTime - 1) {
					console.log("count done!")
					callBackFn()
				} else {
					progressFn()
				}
			}, basicMs * j)
		})(i)
	}
}

/**
 *
 * @param msTime 日期的毫秒表示
 * @returns {{hour: string, minute: string}}
 */
const parseTime = (msTime) => {
	let _tempDate = new Date(msTime)
	return {
		year: _tempDate.getFullYear().toString(),
		month: _tempDate.getMonth() + 1 > 9 ? (_tempDate.getMonth() + 1).toString() : '0' + (_tempDate.getMonth() + 1).toString(),
		date: _tempDate.getDate() > 9 ? _tempDate.getDate().toString() : '0' + _tempDate.getDate().toString(),
		hour: _tempDate.getHours() > 9 ? _tempDate.getHours().toString() : '0' + _tempDate.getHours().toString(),
		minute: _tempDate.getMinutes() > 9 ? _tempDate.getMinutes().toString() : '0' + _tempDate.getMinutes().toString()
	}
}

/**
 * 判断时间与今日的关系（明天/今天）
 * @param msTime 传进日期的毫秒表示
 * @returns {number}
 */
const judgeTime = (msTime) => {
	let _nowDate = new Date()
	let _msTime = new Date(msTime)
	let _y = _nowDate.getFullYear()
	let _m = _nowDate.getMonth() + 1
	let _d = _nowDate.getDate()
	if (_y === _msTime.getFullYear() && _m === _msTime.getMonth() + 1) {
		if (_d - _msTime.getDate() === 0) {
			return 0 // 今天
		}
		if (_d - _msTime.getDate() === -1) {
			return 1 // 明天
		}
		if (_d - _msTime.getDate() > 0) {
			return 2 // 过时
		} else {
			return -1 // 将来
		}
	} else {
		return -2 //  跨年
	}
}

/**
 * randomNum 随机数
 * @param fromNum 最小值
 * @param toNum  最大值
 * @returns {Number} 输出产生的随机数，是整数
 */
const randomNum = (fromNum, toNum) => {
	let _a = Math.random() * toNum;
	while (_a < fromNum || _a > toNum) {
		_a = Math.random() * toNum;
	}
	if (_a > toNum - 0.5) {
		_a = toNum
	}
	return parseInt(_a);
}

/**
 * 值检测函数，用于确定一些值是否得到赋值或者初始化
 * @param values 不定参数
 * @returns {number} 0代表都有值 1代表存在没有赋值的
 */
const verifyVal = (...values) => {
	// console.log(values)
	for (let i of values) {
		if (i == '' || i == null || i == undefined) {
			return 1
		}
	}
	return 0
}


const setSession = (name, content) => {
	if (!name) return;
	if (typeof content !== 'string') {
		content = JSON.stringify(content);
	}
	window.sessionStorage.setItem(name, content);
}

/**
 * 获取STORE
 * @param name 存贮的名字
 */
const getSession = name => {
	if (!name) return;
	return window.sessionStorage.getItem(name);
}

/**
 * 删除sessionSTORE
 * @param name
 */
const removeSession = name => {
	if (!name) return;
	window.sessionStorage.removeItem(name);
}

/**
 * 清除所有的localStorage
 */
const removeAllSession = () => {
	for (let i of Object.keys(window.sessionStorage)) {
		window.sessionStorage.removeItem(i)
	}
}

/**
 *  存储本地STORE
 * @param name
 * @param content
 */
const setStore = (name, content) => {
	if (!name) return;
	if (typeof content !== 'string') {
		content = JSON.stringify(content);
	}
	window.localStorage.setItem(name, content);
}

/**
 * 获取本地STORE
 * @param name 存贮的名字
 */
const getStore = name => {
	if (!name) return;
	return window.localStorage.getItem(name);
}


/**
 * 删除本地STORE
 * @param name
 */
const removeStore = name => {
	if (!name) return;
	window.localStorage.removeItem(name);
}


/**
 * 遍历一个对象，并设置localStorage
 * @param info
 */
const setObjInLocal = (info) => {
	for (let i = 0; i < Object.keys(info).length; ++i) {
		setStore(Object.keys(info)[i], Object.values(info)[i])
		// console.log(window.localStorage)
	}
}

/**
 * 清除所有的localStorage
 */
const removeAllStore = () => {
	for (let i of Object.keys(window.localStorage)) {
		window.localStorage.removeItem(i)
	}
}

/**
 * 判断某个时间是否过期，如果过期 return 1
 * @param Expires
 * @returns {number} 1 过期 0 没过期
 */
const judgeOutDate = (Expires) => {
	let nowDate = +new Date()
	let expTime = +new Date(Expires)
	if (expTime - nowDate > 0) {
		/*没过期*/
		return 0
	} else {
		return 1
	}
}


export {
	countFn, // 计数器
	parseTime, // 时间戳转换器
	judgeTime, // 时间判断器
	randomNum, // 随机数产生器
	verifyVal, // 赋值验证器
	getStore, // 获取localStorage
	removeStore, // 删除localStorage
	setStore, // 设置localStorage
	setObjInLocal, // 将对象设置在localStorage
	judgeOutDate, // 判断过期
	removeAllStore, // 移除所有localStorage
	getSession, // 获取sessionStorage
	setSession, // 设置sessionStorage
	removeSession, // 移除sessionStorage
	removeAllSession // 移除所有sessionStorage
}
