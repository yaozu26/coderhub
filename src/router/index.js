const fs = require("fs")

/**
 *  动态注册当前文件下的所有路由对象
 */
function registerRouter(app) {
  const files = fs.readdirSync(__dirname)

  for (const file of files) {
    if (!file.endsWith(".router.js")) continue

    const router = require(`./${file}`)
    app.use(router.routes())
    app.use(router.allowedMethods())
  }
}

module.exports = registerRouter
