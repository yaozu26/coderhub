const fs = require("fs")
const fileService = require("../service/file.service")
const { UPLOAD_PATH } = require("../config/path")
const userService = require("../service/user.service")
const { SERVER_HOST, SERVER_PORT } = require("../config/server")

class FileController {
  async create(ctx, next) {
    const { filename, mimetype, size } = ctx.request.file
    const { id } = ctx.user

    const result = await fileService.create(filename, mimetype, size, id)

    const avatarUrl = `${SERVER_HOST}:${SERVER_PORT}/file/avatar/${id}`
    const result2 = await userService.updateUserAvatar(avatarUrl, id)

    // 将头像地址存储到user表中

    ctx.body = {
      code: 0,
      message: "上传文件成功",
      data: avatarUrl,
    }
  }

  async showAvatarImage(ctx, next) {
    const { userId } = ctx.params

    const avatarInfo = await fileService.queryAvatarWithUserId(userId)
    // 读取头像所在的文件
    const { filename, mimetype } = avatarInfo
    ctx.type = mimetype
    ctx.body = fs.createReadStream(`${UPLOAD_PATH}/${filename}`)
  }
}

module.exports = new FileController()
