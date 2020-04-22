const path = require('path')
const bodyParser = require('body-parser')
const cors = require('cors')
const express = require('express')
const router = require('./router/router')
const app = express()

// 设置公共文件夹 (static resource such image mp4)
app.use(express.static(path.join(__dirname, 'assets')))
// app.use(express.static(path.join(__dirname, 'public')))

// Body parser 中间件 解析json类型的body 路由回调中，通过req.body.password来获取
app.use(bodyParser.json({ limit: '50mb' }))

// 获取解析application/x-www-form-urlencoded类型的body
app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }))

app.use(cors())

app.use('/', router)

const port = 3000
app.listen(port, () => console.log(`访问${port}端口`))
