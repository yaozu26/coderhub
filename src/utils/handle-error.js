const app = require("../app")
const {
  NAME_OR_PASSWORD_IS_NULL,
  NAME_IS_ALREADY_EXISTS,
  NAME_IS_NOT_EXISTS,
  PASSWORD_IS_INCORRECT,
  UNAUTHORIZED,
  CONTENT_IS_NULL,
  OPERATION_IS_NOT_ALLOW,
} = require("../config/error-constants")

app.on("error", (err, ctx) => {
  let code = 0
  let message = ""

  switch (err) {
    case NAME_OR_PASSWORD_IS_NULL:
      code = -1001
      message = "用户名或者密码不能为空"
      break
    case NAME_IS_ALREADY_EXISTS:
      code = -1002
      message = "用户名已经被占用"
      break
    case NAME_IS_NOT_EXISTS:
      code = -1003
      message = "用户名不存在"
      break
    case PASSWORD_IS_INCORRECT:
      code = -1004
      message = "密码错误"
      break
    case UNAUTHORIZED:
      code = -1005
      message = "无效的token或token已过期"
      break
    case CONTENT_IS_NULL:
      code = -1006
      message = "传入的是一个空内容"
      break
    case OPERATION_IS_NOT_ALLOW:
      code = -1007
      message = "没有操作该资源的权限"
      break
  }

  ctx.body = { code, message }
})
