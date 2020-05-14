const db = require('./../db')
const tools = require('./../tools')

const dbTable = 'play'

const where = ' where 1=1 '

// 获取单个游玩详情
const playDetailSQL = function (params) {
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

// 获取游玩列表
const playListSQL = function (params) {
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

// 发布游玩
const playPublishSQL = function (params) {
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

// 编辑游玩
const playUpdateSQL = function (params) {
  let sql = `update ${dbTable} set title=?, type=?, content=?, publishTime=?, userName=?, state=? `
  let sqlParams = []

  sqlParams.push(params.title)
  sqlParams.push(params.type)
  sqlParams.push(params.content)
  // sqlParams.push(params.publishTime)
  sqlParams.push(Date.now())
  sqlParams.push(params.userName || '管理员')
  sqlParams.push(params.state)

  sql += "where id = ?"
  sqlParams.push(params.id)

  return {
    sql, sqlParams
  }
}

// 删除游玩
const playDeleteSQL = function (params) {
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
  async playDetail(params, getObj) {
    let data = await db.query(playDetailSQL(params), getObj)
    return {
      code: 0,
      msg: 'success',
      data: data
    }
  },
  async playList(params) {
    let data = await db.query(playListSQL(params))
    let total = await tools.getCount(dbTable)
    
    return {
      code: 0,
      msg: 'success',
      total,
      data: data
    }
  },
  async playPublish(params) {
    let data = await db.query(playPublishSQL(params))
    return {
      code: 0,
      msg: 'success',
      id: await tools.getMaxId(dbTable)
    }
  },
  async playUpdate(params) {
    let data = await db.query(playUpdateSQL(params))
    return {
      code: 0,
      msg: 'success',
    }
  },
  async playDelete(params) {
    let data = await db.query(playDeleteSQL(params))
    return {
      code: 0,
      msg: 'success',
      id: params.id
    }
  },
}