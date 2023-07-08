const { OPERATION_IS_NOT_ALLOW } = require("../config/error-constants")
const permissionService = require("../service/permission.service")

// 验证用户的权限
const verifyPermission = async (ctx, next) => {
  const { id } = ctx.user

  const keyName = Object.keys(ctx.params)[0]
  const resourceId = ctx.params[keyName]
  const resourceName = keyName.replace("Id", "")

  const isPermission = await permissionService.checkMoment(resourceId, id, resourceName)

  if (!isPermission) {
    return ctx.app.emit("error", OPERATION_IS_NOT_ALLOW, ctx)
  }

  await next()
}

module.exports = { verifyPermission }
