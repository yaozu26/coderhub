const koaRouter = require("@koa/router")
const { create } = require("../controller/user.controller")
const { verifyUser, handlePassword } = require("../middleware/user.middleware")

const userRouter = new koaRouter({ prefix: "/user" })

//用户注册接口
userRouter.post("/", verifyUser, handlePassword, create)

module.exports = userRouter
