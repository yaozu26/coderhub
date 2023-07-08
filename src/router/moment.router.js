const koaRouter = require("@koa/router")
const { verifyAuth } = require("../middleware/login.middleware")
const { create, list, detail, update, remove, addLabels } = require("../controller/moment.controller")
const { verifyPermission } = require("../middleware/permission.middleware")
const { verifyLabelsExists } = require("../middleware/label.middleware")

const momentRouter = new koaRouter({ prefix: "/moment" })

// 增
momentRouter.post("/", verifyAuth, create)

// 查
momentRouter.get("/", list)
momentRouter.get("/:momentId", detail)

// 改
momentRouter.patch("/:momentId", verifyAuth, verifyPermission, update)

// 删
momentRouter.delete("/:momentId", verifyAuth, verifyPermission, remove)

// (增)添加标签
momentRouter.post("/:momentId/labels", verifyAuth, verifyPermission, verifyLabelsExists, addLabels)

module.exports = momentRouter
