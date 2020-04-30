const db = require('./../db')

const dbTable = 'comment'

const where = ' where 1=1 '

// 获取评论列表
const commentListSQL = function (params) {
  let sql = `select * from ${dbTable} ${where}`
  let sqlParams = []

  if (params.id) {
    sql += 'AND contentId = ?'
    sqlParams.push(params.id)
  }

  sql += `order by id desc limit ${params.pn * params.pl},${params.pl}`

  return {
    sql, sqlParams
  }
}

// 添加评论
const commentAddSQL = function (params) {
  let sql = `insert into ${dbTable} (comment, userName, publishTime, type, contentId) values(?,?,?,?,?)`
  let sqlParams = []

  sqlParams.push(params.comment)
  sqlParams.push(params.userName)
  sqlParams.push(Date.now())
  sqlParams.push(params.type)
  sqlParams.push(params.contentId)

  return {
    sql, sqlParams
  }
}

module.exports = {
  async commentList(params, getObj) {
    let data = await db.query(commentListSQL(params), getObj)
    return {
      code: 0,
      msg: 'success',
      data: data
    }
  },
  async commentAdd(params, getObj) {
    await db.query(commentAddSQL(params), getObj)
    return {
      code: 0,
      msg: 'success'
    }
  },
}