const db = require('./../db')
const tools = require('./../tools')

const dbTable = 'notice'

const where = ' where 1=1 '

// 获取单个公告详情
const noticeDetailSQL = function (params) {
  let sql = `select * from ${dbTable} ${where}`
  let sqlParams = []

  if (params.id) {
    sql += 'AND id = ?'
    sqlParams.push(params.id)
  }

  return {
    sql, sqlParams
  }
}

// 获取公告列表
const noticeListSQL = function (params) {
  let sql = `select * from ${dbTable} ${where} `
  let sqlParams = []

  if (params.type) {
    sql += 'AND type = ? '
    sqlParams.push(params.type)
  }
  if (params.state) {
    sql += 'AND state = ? '
    sqlParams.push(params.state)
  }

  sql += `order by id desc limit ${params.pn * params.pl},${params.pl}`

  return {
    sql, sqlParams
  }
}

// 发布公告
const noticePublishSQL = function (params) {
  let sql = `insert into ${dbTable} (title, type, content, publishTime, userName, state) values(?,?,?,?,?,?)`
  let sqlParams = []

  sqlParams.push(params.title)
  sqlParams.push(params.type)
  sqlParams.push(params.content)
  // sqlParams.push(params.publishTime)
  sqlParams.push(Date.now())
  sqlParams.push(params.userName || '管理员')
  sqlParams.push(params.state)

  return {
    sql, sqlParams
  }
}

// 删除公告
const noticeDeleteSQL = function (params) {
  let sql = `delete from ${dbTable} ${where}`
  let sqlParams = []

  if (params.id) {
    sql += 'AND id = ?'
    sqlParams.push(params.id)
  }

  return {
    sql, sqlParams
  }
}

module.exports = {
  async noticeDetail(params, getObj) {
    let data = await db.query(noticeDetailSQL(params), getObj)
    return {
      code: 0,
      msg: 'success',
      data: data
    }
  },
  async noticeList(params) {
    let data = await db.query(noticeListSQL(params))
    return {
      code: 0,
      msg: 'success',
      data: data
    }
  },
  async noticePublish(params) {
    let data = await db.query(noticePublishSQL(params))
    return {
      code: 0,
      msg: 'success',
      id: await tools.getMaxId(dbTable)
    }
  },
  async noticeDelete(params) {
    let data = await db.query(noticeDeleteSQL(params))
    return {
      code: 0,
      msg: 'success',
      id: params.id
    }
  },
}