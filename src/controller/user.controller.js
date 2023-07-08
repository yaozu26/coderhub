const { create } = require("../service/user.service")

class UserController {
  /**
   *  用户创建成功
   */
  async create(ctx, next) {
    // 1、获取用户传递过来的信息
    const user = ctx.request.body

    // 2、将user信息存储到数据库中
    const result = await create(user)

    // 3、返回给客户端的结果
    ctx.body = {
      message: "创建用户成功~",
      data: result,
    }
  }
}

module.exports = new UserController()
