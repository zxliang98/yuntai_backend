const db = require('./../db')
const tools = require('./../tools')

const dbTable = 'view'

const where = ' where 1=1 '

// 获取单个景区详情
const viewDetailSQL = function (params) {
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

// 获取景区列表
const viewListSQL = function (params) {
  let sql = `select * from ${dbTable} ${where} `
  let sqlParams = []

  if (params.state) {
    sql += 'AND state = ? '
    sqlParams.push(params.state)
  }

  sql += `order by id desc limit ${params.pn * params.pl},${params.pl}`

  return {
    sql, sqlParams
  }
}

// 发布景区
const viewPublishSQL = function (params) {
  let sql = `insert into ${dbTable} (title, content, publishTime, userName, state) values(?,?,?,?,?)`
  let sqlParams = []

  sqlParams.push(params.title)
  sqlParams.push(params.content)
  // sqlParams.push(params.publishTime)
  sqlParams.push(Date.now())
  sqlParams.push(params.userName || '管理员')
  sqlParams.push(params.state)

  return {
    sql, sqlParams
  }
}

// 编辑景区
const viewUpdateSQL = function (params) {
  let sql = `update ${dbTable} set title=?, content=?, publishTime=?, userName=?, state=? `
  let sqlParams = []

  sqlParams.push(params.title)
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

// 删除景区
const viewDeleteSQL = function (params) {
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
  async viewDetail(params, getObj) {
    let data = await db.query(viewDetailSQL(params), getObj)
    return {
      code: 0,
      msg: 'success',
      data: data
    }
  },
  async viewList(params) {
    let data = await db.query(viewListSQL(params))
    let total = await tools.getCount(dbTable)
    return {
      code: 0,
      msg: 'success',
      total,
      data: data
    }
  },
  async viewPublish(params) {
    let data = await db.query(viewPublishSQL(params))
    let id = await tools.getMaxId(dbTable)
    
    return {
      code: 0,
      msg: 'success',
      id: id
    }
  },
  async viewUpdate(params) {
    let data = await db.query(viewUpdateSQL(params))
    console.log(data);
    
    return {
      code: 0,
      msg: 'success',
    }
  },
  async viewDelete(params) {
    let data = await db.query(viewDeleteSQL(params))
    return {
      code: 0,
      msg: 'success',
      id: params.id
    }
  },
}