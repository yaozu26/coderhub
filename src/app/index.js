const koa = require("koa")
const bodyParser = require("koa-bodyparser")
const registerRouter = require("../router")

const app = new koa()

app.use(bodyParser())

registerRouter(app)

module.exports = app
