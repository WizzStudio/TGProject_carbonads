const express = require('express');
const bodyParser = require('body-parser');
const logger  = require("morgan");
const path = require('path');


/**
 * express server
 */
const app = express();
const port = process.env.PORT || 3000;

/**
 * express global configuration
 */
app.set("views", path.join(__dirname, "../views"));  // 绑定MVC中的View层
app.set("view engine", "pug");  // 使用渲染引擎
app.use(logger("dev"));  // 使用express 自带 logger -Morgan /*dev common combined short tiny*/
app.use(bodyParser.json());  // 处理http请求body里的application/json数据
app.use(bodyParser.urlencoded({extended: false}));  // for application/x-www-form-urlencoded
app.use(express.static(path.join(__dirname, "../public"), {maxAge: 31557600000})); // 使用express静态转发，/js将转发到/public/js

app.get('/',(req,res)=>{
	res.render('index')
});


/**
 * start server port
 */
app.listen(port, () => {
	console.log(`server listen at ${port}`);
});