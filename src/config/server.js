const dotenv = require("dotenv")

// 拿到.env的变量
dotenv.config()

module.exports = { SERVER_HOST, SERVER_PORT } = process.env
