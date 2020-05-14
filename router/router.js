// controller
const express = require('express')
const router = express.Router()

const noticeManage = require('./../server/notice/notice')
const viewManage = require('./../server/view/view')
const playManage = require('./../server/play/play')
const userManage = require('./../server/user/user')
const commentManage = require('./../server/comment/comment')

// 获取用户详情
router.get('/user', async (req, res, next) => {
  let data = await userManage.userDetail(req.query, true)
  res.send(data)
})

// 获取用户详情
router.get('/userList', async (req, res, next) => {
  let data = await userManage.userList(req.query)
  res.send(data)
})

// 用户登录
router.post('/login', async (req, res, next) => {
  let data = await userManage.userLogin(req.body, true)
  res.send(data)
})

// 用户注册
router.post('/register', async (req, res, next) => {
  await userManage.userRegister(req.body, true)
  let user = await userManage.userLogin(req.body, true)
  res.send(user)
})

// 修改用户信息
router.put('/user', async (req, res, next) => {
  let data = await userManage.userInfoUpdate(req.body, true)
  res.send(data)
})

// 删除用户
router.delete('/user', async (req, res, next) => {
  let data = await userManage.userDelete(req.body)
  res.send(data)
})

// 获取公告详情
router.get('/notice', async (req, res, next) => {
  let data = await noticeManage.noticeDetail(req.query, true)
  res.send(data)
})

// 获取公告列表
router.get('/noticeList', async (req, res, next) => {
  let data = await noticeManage.noticeList(req.query)
  res.send(data)
})

// 发布公告
router.post('/notice', async (req, res, next) => {
  let data = await noticeManage.noticePublish(req.body)
  res.send(data)
})

// 编辑景区
router.put('/notice', async (req, res, next) => {
  let data = await noticeManage.noticeUpdate(req.body)
  res.send(data)
})

// 删除公告
router.delete('/notice', async (req, res, next) => {
  let data = await noticeManage.noticeDelete(req.body)
  res.send(data)
})


// 获取景区详情
router.get('/view', async (req, res, next) => {
  let data = await viewManage.viewDetail(req.query, true)
  res.send(data)
})

// 获取景区列表
router.get('/viewList', async (req, res, next) => {
  let data = await viewManage.viewList(req.query)
  res.send(data)
})

// 发布景区
router.post('/view', async (req, res, next) => {
  let data = await viewManage.viewPublish(req.body)
  res.send(data)
})

// 编辑景区
router.put('/view', async (req, res, next) => {
  let data = await viewManage.viewUpdate(req.body)
  res.send(data)
})

// 删除景区
router.delete('/view', async (req, res, next) => {
  let data = await viewManage.viewDelete(req.body)
  res.send(data)
})


// 获取游玩详情
router.get('/play', async (req, res, next) => {
  let data = await playManage.playDetail(req.query, true)
  res.send(data)
})

// 获取游玩列表
router.get('/playList', async (req, res, next) => {
  let data = await playManage.playList(req.query)
  res.send(data)
})

// 发布游玩
router.post('/play', async (req, res, next) => {
  let data = await playManage.playPublish(req.body)
  res.send(data)
})

// 发布游玩
router.put('/play', async (req, res, next) => {
  let data = await playManage.playUpdate(req.body)
  res.send(data)
})

// 删除游玩
router.delete('/play', async (req, res, next) => {
  let data = await playManage.playDelete(req.body)
  res.send(data)
})

// 获取评论列表
router.get('/comment', async (req, res, next) => {
  let data = await commentManage.commentList(req.query)
  res.send(data)
})

// 获取评论列表
router.post('/comment', async (req, res, next) => {
  let data = await commentManage.commentAdd(req.body)
  res.send(data)
})

module.exports = router
