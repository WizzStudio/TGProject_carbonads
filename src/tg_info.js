const express = require('express');
const logger  = require("morgan");
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
const session = require('express-session');
const bodyParser = require('body-parser');

/**
 * middlewares
 */
const message = require('./lib/middlewares/message');

/**
 * controller 
 */
const mainController = require('./controllers/main');
const adminController = require('./controllers/admin');
const apiController = require('./controllers/api');

/**
 * express server
 */
const app = express();
const port = process.env.PORT || 3000;

/**
 * mongodb database
 */
mongoose.connect('mongodb://localhost/tginfo', {useMongoClient: true});
const db = mongoose.connection;
db.on('error', (err) => {console.log(err)});
db.on('open', () => {console.log('open mongodb successfully');});

/**
 * express global configuration
 */
const sessionOpts = {
	secret: 'myblog',
    resave: false,
    saveUninitialized: false,  // 如果与初始化相同，则不保存
    cookies: {
        maxAge: 30*60*1000,
        httpOnly: true
    }
}
const logStream = fs.createWriteStream(path.join(__dirname, 'logger.log'), {flags: 'a'});
app.set("views", path.join(__dirname, "../views"));  // 绑定MVC中的View层
app.set("view engine", "pug");  // 使用渲染引擎
app.use(bodyParser.urlencoded({extended: true}));
app.use(session(sessionOpts)); // 解析session
app.use(logger(":date :method :url :status :response-time ms", {
  skip: function (req, res) { return res.statusCode < 400;},
  stream: logStream
}));  // 使用express 自带 logger -Morgan /*dev common combined short tiny*/
app.use(express.static(path.join(__dirname, "../public"), {maxAge: 1000})); // 使用express静态转发，/js将转发到/public/js
app.use(message);  // 用于重定向传递错误信息

/**
 * user routers
 */
app.use('/admin', adminController);
app.use('/api', apiController);
app.get('/', (req, res) => {res.render('index', {title: 'Stu Info'})});
app.get('/business', mainController);
app.get('/design', mainController);
app.get('/dev', mainController);
app.get('/about', (req, res) => {res.render('about', {title: 'About'})});
app.get('/test', (req, res) => {res.render('test')});

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
// app.use((err, req, res, next) => {
// 	err.status = err.status || 500;
// 	if (err.status != 404) {
// 		err.message = '500 Internal Server Error!';
// 	} else {
// 		err.message = '404 Not Found!';
// 	}
// 	res.statusCode = err.status;
// 	res.render('error', {message: err.message});
// });

/**
 * start server port
 */
app.listen(port, () => {
	console.log(`server listen at ${port}`);
});