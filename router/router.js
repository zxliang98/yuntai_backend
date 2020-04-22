// controller
const express = require('express')
const router = express.Router()

const noticeManage = require('./../server/notice/notice')
const viewManage = require('./../server/view/view')
const playManage = require('./../server/play/play')

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

// 删除游玩
router.delete('/play', async (req, res, next) => {
  let data = await playManage.playDelete(req.body)
  res.send(data)
})
module.exports = router
