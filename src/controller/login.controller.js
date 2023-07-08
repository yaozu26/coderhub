const jwt = require("jsonwebtoken")
const { PRIVATE_KEY } = require("../config/secret")

class LoginController {
  /**
   *  用户登录颁发token，返回客户端成功信息
   */
  sign(ctx, next) {
    // 1、 获取用户信息
    const { id, name } = ctx.user

    //2、颁发令牌-token
    const token = jwt.sign({ id, name }, PRIVATE_KEY, {
      expiresIn: 24 * 60 * 60,
      algorithm: "RS256",
    })

    // 3、返回用户信息
    ctx.body = { code: 0, data: { id, name, token } }
  }

  /**
   *  验证token成功
   */
  test(ctx, next) {
    ctx.body = "验证身份通过"
  }
}

module.exports = new LoginController()
