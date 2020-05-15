const db = require('./db')

const where = ' where 1=1 '

// 获取最大id
const getMaxIdSQL = function (tbName) {
  let sql = `select max(id) as MAXID from ${tbName} `
  return {
    sql
  }
}
// 获取总数
const getCountSQL = function (tbName, params) {
  let sql = `select count(*) as COUNT from ${tbName} ${where}`
  let sqlParams = []
  if (params && params.type) {
    sql += 'AND type = ? '
    sqlParams.push(params.type)
  }
  if (params && params.state) {
    sql += 'AND state = ? '
    sqlParams.push(params.state)
  }
  return {
    sql, sqlParams
  }
}

module.exports = {
  async getMaxId(tbName) {
    let data = await db.query(getMaxIdSQL(tbName))
    return data[0].MAXID
  },
  async getCount(tbName, params) {
    let data = await db.query(getCountSQL(tbName, params))
    return data[0].COUNT
  }
}
