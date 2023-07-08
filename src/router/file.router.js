const koaRouter = require("@koa/router")
const { verifyAuth } = require("../middleware/login.middleware")
const { handleAvatar } = require("../middleware/file.middleware")
const { create, showAvatarImage } = require("../controller/file.controller")

const fileRouter = new koaRouter({ prefix: "/file" })

fileRouter.post("/avatar", verifyAuth, handleAvatar, create)
fileRouter.get("/avatar/:userId", showAvatarImage)

module.exports = fileRouter
