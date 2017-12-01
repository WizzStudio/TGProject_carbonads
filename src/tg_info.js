const express = require('express');
const logger  = require("morgan");
const path = require('path');
const fs = require('fs');

/**
 * controller 
 */
const mainController = require('./controllers/main');

/**
 * express server
 */
const app = express();
const port = process.env.PORT || 3000;

/**
 * express global configuration
 */
let logStream = fs.createWriteStream(path.join(__dirname, 'logger.log'), {flags: 'a'});
app.set("views", path.join(__dirname, "../views"));  // 绑定MVC中的View层
app.set("view engine", "pug");  // 使用渲染引擎
app.use(logger(":date :method :url :status :response-time ms", {stream: logStream}));  // 使用express 自带 logger -Morgan /*dev common combined short tiny*/
app.use(express.static(path.join(__dirname, "../public"), {maxAge: 1000})); // 使用express静态转发，/js将转发到/public/js

/**
 * user routers
 */
app.get('/', (req, res) => {res.render('index', {title: 'Stu Info'})});
app.get('/business', mainController.businessHandler);
app.get('/design', mainController.designHandler);
app.get('/dev', mainController.devHandler);
app.get('/about', (req, res) => {res.render('about', {title: 'About'})});

/**
 * 404 NOT FOUND
 */
app.use((req, res, next) => {
	let err = new Error('404 Not Found!');
	err.status = 404;
	next(err);
});

/**
 * error handler
 */
app.use((err, req, res, next) => {
	err.status = err.status || 500;
	if (err.status != 404) {
		err.message = '500 Internal Server Error!';
	} else {
		err.message = '404 Not Found!';
	}
	res.statusCode = err.status;
	res.render('error', {message: err.message});
});

/**
 * start server port
 */
app.listen(port, () => {
	console.log(`server listen at ${port}`);
});