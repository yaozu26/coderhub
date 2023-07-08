const commentService = require("../service/comment.service")

class CommentController {
  // 发表评论
  async create(ctx, next) {
    const { content, momentId } = ctx.request.body
    const { id } = ctx.user

    const result = await commentService.create(content, momentId, id)

    ctx.body = {
      code: 0,
      message: "发表评论成功",
      data: result,
    }
  }

  // 回复评论
  async reply(ctx, next) {
    const { content, momentId, commentId } = ctx.request.body
    const { id } = ctx.user

    const result = await commentService.reply(content, momentId, id, commentId)

    ctx.body = {
      code: 0,
      message: "回复评论成功",
      data: result,
    }
  }
}

module.exports = new CommentController()
