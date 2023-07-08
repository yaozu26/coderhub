const { NAME_OR_PASSWORD_IS_NULL, NAME_IS_ALREADY_EXISTS } = require("../config/error-constants")
const userService = require("../service/user.service")
const md5Password = require("../utils/md5-password")

/**
 *  验证用户名和密码
 */
const verifyUser = async (ctx, next) => {
  // 1、 用户名或者密码不能为空
  const { name, password } = ctx.request.body
  if (!name || !password) {
    return ctx.app.emit("error", NAME_OR_PASSWORD_IS_NULL, ctx)
  }

  // 2、 用户名已存在
  const users = await userService.findUserByName(name)
  if (users.length) {
    return ctx.app.emit("error", NAME_IS_ALREADY_EXISTS, ctx)
  }

  // 3、 执行下一个中间件
  await next()
}

/**
 *  对密码进行加密
 */
const handlePassword = async (ctx, next) => {
  const { password } = ctx.request.body

  ctx.request.body.password = md5Password(password)

  await next()
}

module.exports = {
  verifyUser,
  handlePassword,
}
