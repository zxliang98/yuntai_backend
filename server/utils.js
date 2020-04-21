const dateFormat = function (fmt, date) {
  let ret
  const opt = {
    "Y+": date.getFullYear().toString(),        // 年
    "m+": (date.getMonth() + 1).toString(),     // 月
    "d+": date.getDate().toString(),            // 日
    "H+": date.getHours().toString(),           // 时
    "M+": date.getMinutes().toString(),         // 分
    "S+": date.getSeconds().toString()          // 秒
    // 有其他格式化字符需求可以继续添加，必须转化成字符串
  }
  for (let k in opt) {
    ret = new RegExp("(" + k + ")").exec(fmt)
    if (ret) {
      fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
    };
  };
  return fmt
}
module.exports = {
  //对象中是否存在属性
  propertyIsNotEmpty(obj, property) {
    console.log(obj)
    console.log(property)
    if ((property in obj) && obj[property]) {
      return true
    } else {
      return false
    }
  },
  //转驼峰
  toCamel(str) {
    return str.replace(/([^_])(?:_+([^_]))/g, function ($0, $1, $2) {
      return $1 + $2.toUpperCase()
    })
  },
  isArray(o) {
    return Object.prototype.toString.call(o) === '[object Array]'
  },
  date: {
    //2019-11-03T11:41:56.000Z
    utcToDate(str) {
      let d = new Date(str)
      return dateFormat('YYYY-mm-dd HH:MM:SS', d)
    }
  }
}