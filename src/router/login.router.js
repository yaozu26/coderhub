const koaRouter = require("@koa/router")
const { sign, test } = require("../controller/login.controller")
const { verifyLogin, verifyAuth } = require("../middleware/login.middleware")

const loginRouter = new koaRouter({ prefix: "/login" })

// 生成token的接口
loginRouter.post("/", verifyLogin, sign)

// 测试登录
loginRouter.get("/test", verifyAuth, test)

module.exports = loginRouter
