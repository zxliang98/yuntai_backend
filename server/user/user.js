const db = require('./../db')
const tools = require('./../tools')

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

// 获取用户列表
const userListSQL = function (params) {
  let sql = `select * from ${dbTable} ${where}`
  let sqlParams = []
  if (params.type) {
    sql += 'AND type = ? '
    sqlParams.push(params.type)
  }
  if (params.state) {
    sql += 'AND state = ? '
    sqlParams.push(params.state)
  }

  sql += ` limit ${params.pn * params.pl},${params.pl}`

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
  let sql = `insert into ${dbTable}(phone,userPassword,type) values(?,?,?)`
  let sqlParams = []

  sqlParams.push(params.phone)
  sqlParams.push(params.userPassword)
  sqlParams.push(params.type)

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

  sql += `name=?,age=?,userName=?,phone=?,gender=?,type=?,state=? `
  sqlParams.push(params.name)
  sqlParams.push(params.age)
  sqlParams.push(params.userName)
  sqlParams.push(params.phone)
  sqlParams.push(params.gender)
  sqlParams.push(params.type)
  sqlParams.push(params.state)


  sql += "where id = ?"
  sqlParams.push(params.id)

  return {
    sql, sqlParams
  }
}

// 删除用户
const userDeleteSQL = function (params) {
  let sql = `delete from ${dbTable} ${where}`
  let sqlParams = []

  sql += 'AND id = ?'
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
        id: data.id,
        type: data.type
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
  async userList(params, getObj) {
    let data = await db.query(userListSQL(params), getObj)
    let total = await tools.getCount(dbTable, params)
    return {
      code: 0,
      msg: 'success',
      total,
      list: data
    }
  },
  async userDelete(params, getObj) {
    await db.query(userDeleteSQL(params), getObj)
    return {
      code: 0,
      msg: 'success',
      id: params.id
    }
  },
}