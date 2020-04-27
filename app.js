const path = require('path')
const bodyParser = require('body-parser')
// const cors = require('cors')
const express = require('express')
const router = require('./router/router')
const app = express()

// app.use(cors({
//   origin: ['http://www.zxliang.xyz', 'http://www.zxliang.xyz:3023'],
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   alloweHeaders: ['Conten-Type', 'application/json;charset=utf-8']
// }))

//设置跨域访问
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By",' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

// 设置公共文件夹 (static resource such image mp4)
app.use(express.static(path.join(__dirname, 'assets')))
// app.use(express.static(path.join(__dirname, 'public')))

// Body parser 中间件 解析json类型的body 路由回调中，通过req.body.password来获取
app.use(bodyParser.json({ limit: '50mb' }))

// 获取解析application/x-www-form-urlencoded类型的body
app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }))

app.use('/api', router)

const port = 3000
app.listen(port, () => console.log(`访问${port}端口`))
