const db = require('./../db')

const dbTable = 'user'

const where = ' where 1=1 '

// 获取单个用户详情
const userDetailSQL = function (params) {
  let sql = `select * from ${dbTable} ${where}`
  let sqlParams = []

  if (params.id) {
    sql += 'AND id = ?'
    sqlParams.push(params.id)
  }
  if (params.phone) {
    sql += 'AND phone = ?'
    sqlParams.push(params.phone)
  }
  if (params.userPassword) {
    sql += 'AND userPassword = ?'
    sqlParams.push(params.userPassword)
  }

  return {
    sql, sqlParams
  }
}

// 用户登录
const userLoginSQL = function (params) {
  let sql = `select * from ${dbTable} ${where}`
  let sqlParams = []

  sql += `AND phone = ? `
  sql += `AND userPassword = ?`
  sqlParams.push(params.phone)
  sqlParams.push(params.userPassword)

  return {
    sql, sqlParams
  }
}

// 用户注册
const userRegisterSQL = function (params) {
  let sql = `insert into ${dbTable}(phone,userPassword) values(?,?)`
  let sqlParams = []

  sqlParams.push(params.phone)
  sqlParams.push(params.userPassword)

  return {
    sql, sqlParams
  }
}

// 修改用户信息
const userInfoUpdateSQL = function (params) {
  let sql = `update ${dbTable} set `
  let sqlParams = []

  if (params.userPassword) {
    sql += 'userPassword=?,'
    sqlParams.push(params.userPassword)
  }

  sql += `name=?,age=?,userName=?,phone=?,gender=?`
  sqlParams.push(params.name)
  sqlParams.push(params.age)
  sqlParams.push(params.userName)
  sqlParams.push(params.phone)
  sqlParams.push(params.gender)


  sql += "where id = ?"
  sqlParams.push(params.id)

  return {
    sql, sqlParams
  }
}

module.exports = {
  async userDetail(params, getObj) {
    let data = await db.query(userDetailSQL(params), getObj)
    return {
      code: 0,
      msg: 'success',
      data: data
    }
  },
  async userLogin(params, getObj) {
    let data = await db.query(userLoginSQL(params), getObj)
    if (data.id) {
      return {
        code: 0,
        msg: 'success',
        id: data.id
      }
    } else {
      return {
        code: 1,
        msg: 'error'
      }
    }
  },
  async userRegister(params, getObj) {
    await db.query(userRegisterSQL(params), getObj)

    return {
      code: 0,
      msg: 'success'
    }
  },
  async userInfoUpdate(params, getObj) {
    let data = await db.query(userInfoUpdateSQL(params), getObj)
    console.log(data)

    return {
      code: 0,
      msg: 'success'
    }
  },
}