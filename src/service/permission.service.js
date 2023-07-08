const connection = require("../app/database")

class PermissionService {
  // 通过动态id和用户id查询，查询到数据就返回true，否则false
  async checkMoment(momentId, userId, resourceName) {
    const statement = `SELECT * FROM ${resourceName} WHERE id = ? AND user_id = ?;`
    const [result] = await connection.execute(statement, [momentId, userId])
    return !!result.length
  }
}

module.exports = new PermissionService()
