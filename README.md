# TGProject_carbonads
[![building](https://img.shields.io/travis/rust-lang/rust.svg?style=flat-square)](building)

## 功能
提供Web学习网站

## 启动与部署（服务器上需要提前安装好mongo）
- 下载所需依赖
进入项目文件夹后：
```bash
npm install 或者 cnpm install
```

- 启动mongo

备注：db是放置在/src/db下的，考虑到仓库的一致性，所以没有把/src/db发布到git仓库里，此处需要在/src文件夹下新建一个db的目录

```bash
mongod --dbpath=src/db/
```

- 新建另一个shell会话窗口，并初始化数据库
```bash
node src/lib/writeDB.js
```
- 初始化用户
设置用户名和密码
```bash
vi src/lib/createnewuser.js
```
- 载入用户
```
node src/lib/createnewuser.js
```
- 浏览网页

## 命令
- 初始化数据库
```bash
npm run initdb
```
*只能初始化一次，若想保证数据安全，可把data目录删除*
- 启动开发模式，同时会启动下面两个命令
```bash
npm run dev
```
- 启动对Sass进行监视，如果sass文件有改动，自动编译
```bash
npm run watch-sass
```
- 启动Mongodb
```bash
npm run startdb
```
- 运行node服务器
```bash
npm run serve
```

## 开发者
游朝阳
郑守建


## 技术栈
前端：
1. pug
2. BootStrap

后端：
1. express

package：
- express
- morgan
- path
- node-sass
- nodemon
- concurrently
- pug
- mongoose
- body-parser
- express-session
- formidable
- bcrypt
