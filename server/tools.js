const db = require('./db')

// 获取最大id
const getMaxIdSQL = function (tbName) {
  let sql = `select max(id) as MAXID from ${tbName} `
  return {
    sql
  }
}
// 获取总数
const getCountSQL = function (tbName) {
  let sql = `select count(*) as COUNT from ${tbName} `
  return {
    sql
  }
}

module.exports = {
  async getMaxId(tbName) {
    let data = await db.query(getMaxIdSQL(tbName))
    return data[0].MAXID
  },
  async getCount(tbName) {
    let data = await db.query(getCountSQL(tbName))
    return data[0].COUNT
  }
}
