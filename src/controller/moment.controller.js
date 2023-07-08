const { CONTENT_IS_NULL } = require("../config/error-constants")
const momentService = require("../service/moment.service")

class MomentController {
  // 创建动态
  async create(ctx, next) {
    const { content } = ctx.request.body

    if (!content) {
      return ctx.app.emit("error", CONTENT_IS_NULL, ctx)
    }

    const { id } = ctx.user

    // 将数据保存到数据库中
    const result = await momentService.create(content, id)

    ctx.body = {
      code: 0,
      message: "发表动态成功",
      data: result,
    }
  }

  // 查询所有动态列表
  async list(ctx, next) {
    const { offset, size } = ctx.query

    const result = await momentService.queryList(offset, size)

    ctx.body = {
      code: 0,
      data: result,
    }
  }

  // 查询单条动态详情
  async detail(ctx, next) {
    const { momentId } = ctx.params

    const result = await momentService.queryDetail(momentId)

    ctx.body = {
      code: 0,
      data: result[0],
    }
  }

  // 修改动态
  async update(ctx, next) {
    const { momentId } = ctx.params
    const { content } = ctx.request.body
    const result = await momentService.updateInfo(content, momentId)
    ctx.body = {
      code: 0,
      message: "已成功修改动态",
      data: result,
    }
  }

  // 删除动态
  async remove(ctx, next) {
    const { momentId } = ctx.params
    const result = await momentService.removeData(momentId)
    ctx.body = {
      code: 0,
      message: "删除动态成功",
      data: result,
    }
  }

  //为moment添加labels
  async addLabels(ctx, next) {
    const { labels } = ctx
    const { momentId } = ctx.params

    try {
      for (const label of labels) {
        const isExists = await momentService.hasLabel(momentId, label.id)
        if (!isExists) {
          const result = await momentService.addLabel(momentId, label.id)
        }
      }

      ctx.body = {
        code: 0,
        message: "为动态添加标签成功",
      }
    } catch (error) {
      ctx.body = {
        code: -3001,
        message: "为动态添加标签失败，请检测数据",
      }
    }
  }
}

module.exports = new MomentController()
