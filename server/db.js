const mysql = require('mysql')
const util = require('./utils')

const conf = {
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'testdb',
  port: '3306',
  multipleStatements: true    // 多语句查询
}
const pool = mysql.createPool(conf)

module.exports = {
  query(input) {
    console.debug("DEBUG: [SQL]   ", input.sql)
    console.debug("DEBUG: [PARAM] ", input.sqlParams)
    // 异步改同步
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        connection.query(input.sql, input.sqlParams, (err, result) => {
          if (!result) {
            console.error(err)
            reject(null)
          } else if (!util.isArray(result)) {
            resolve([])
          } else {
            let list = []
            result.forEach(row => {
              let camelRow = {}
              for (let key in row) {
                let camelKey = util.toCamel(key) //parent_id 转 parentId
                camelRow[camelKey] = row[key]

                if (key == 'create_time') {
                  camelRow['createTimeStr'] = util.date.utcToDate(row[key])
                }
                if (key == 'update_time') {
                  camelRow['updateTimeStr'] = util.date.utcToDate(row[key])
                }
              }
              list.push(camelRow)
            })
            if (list.length < 2) {
              resolve(list[0] || [])
            } else {
              resolve(list)
            }
          }
          connection.release()
        })
      })
    })
  }
}