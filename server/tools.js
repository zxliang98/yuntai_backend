const db = require('./db')

// 获取最大id
const getMaxIdSQL = function (tbName) {
  let sql = `select max(id) from ${tbName} `
  return {
    sql
  }
}

module.exports = {
  async getMaxId(tbName) {
    let data = await db.query(getMaxIdSQL(tbName))
    return data['max(id)']
  }
}
