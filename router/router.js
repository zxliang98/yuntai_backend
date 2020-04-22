// controller
const express = require('express')
const router = express.Router()

const noticeManage = require('./../server/notice/notice')

router.get('/notice', async (req, res, next) => {
  let list = await noticeManage.noticeDetail(req.query)
  res.send(list)
})

router.get('/noticeList', async (req, res, next) => {
  let list = await noticeManage.noticeList(req.query)
  res.send(list)
})

router.post('/notice', async (req, res, next) => {
  let list = await noticeManage.noticePublish(req.body)
  res.send(list)
})

router.delete('/notice', async (req, res, next) => {
  let list = await noticeManage.noticeDelete(req.body)
  res.send(list)
})

module.exports = router
