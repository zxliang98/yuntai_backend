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

router.get('/maxId', async (req, res, next) => {
  let list = await noticeManage.getMaxId(req.query)
  res.send(list)
})

module.exports = router
