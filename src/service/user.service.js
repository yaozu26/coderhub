const connection = require("../app/database")

class UserService {
  /**
   * 在数据库中创建用户数据
   * @param {*} user
   * @returns
   */
  async create(user) {
    // 1、获取用户信息
    const { name, password } = user

    // 2、拼接statement
    const statement = "INSERT INTO `user` (name, password) VALUES(?, ?); "

    // 3、执行sql语句
    const [result] = await connection.execute(statement, [name, password])
    return result
  }

  /**
   * 查询数据表中用户名数据是否存在
   */
  async findUserByName(name) {
    const statement = "SELECT * FROM `user` WHERE name = ?;"
    const [values] = await connection.execute(statement, [name])
    return values
  }

  // 增加头像地址
  async updateUserAvatar(avatarUrl, userId) {
    const statement = "UPDATE user SET avatar_url = ? WHERE id = ?;"
    const [result] = await connection.execute(statement, [avatarUrl, userId])
    return result
  }
}

module.exports = new UserService()
