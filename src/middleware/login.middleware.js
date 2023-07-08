const jwt = require("jsonwebtoken")
const {
  NAME_OR_PASSWORD_IS_NULL,
  NAME_IS_NOT_EXISTS,
  PASSWORD_IS_INCORRECT,
  UNAUTHORIZED,
} = require("../config/error-constants")
const { findUserByName } = require("../service/user.service")
const md5Password = require("../utils/md5-password")
const { PUBLIC_KEY } = require("../config/secret")

/**
 *  验证用户名的登录逻辑
 * @param ctx
 * @param next 执行下一个中间间的方法
 */
const verifyLogin = async (ctx, next) => {
  const { name, password } = ctx.request.body

  // 1、判断用户名或密码是否为空
  if (!name || !password) {
    return ctx.app.emit("error", NAME_OR_PASSWORD_IS_NULL, ctx)
  }

  // 2、查询用户是否存在
  const users = await findUserByName(name)
  const user = users[0]
  if (!user) {
    return ctx.app.emit("error", NAME_IS_NOT_EXISTS, ctx)
  }

  // 3、查询数据库中密码和用户传递密码是否一致
  if (user.password !== md5Password(password)) {
    return ctx.app.emit("error", PASSWORD_IS_INCORRECT, ctx)
  }

  // 4、将user对象保存到ctx中
  ctx.user = user

  // 5、执行下一个中间件
  await next()
}

/**
 *  验证token
 */
const verifyAuth = async (ctx, next) => {
  const authorization = ctx.headers.authorization

  if (!authorization) {
    return ctx.app.emit("error", UNAUTHORIZED, ctx)
  }

  const token = authorization.replace("Bearer ", "")

  try {
    const result = jwt.verify(token, PUBLIC_KEY, {
      algorithms: ["RS256"],
    })

    // 将token信息保留下来
    ctx.user = result

    await next()
  } catch (error) {
    return ctx.app.emit("error", UNAUTHORIZED, ctx)
  }
}

module.exports = {
  verifyLogin,
  verifyAuth,
}
