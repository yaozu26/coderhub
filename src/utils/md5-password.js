const crypto = require("crypto")

/**
 *  非对称加密
 */
function md5Password(password) {
  const md5 = crypto.createHash("md5")
  const md5pwd = md5.update(password).digest("hex")
  return md5pwd
}

module.exports = md5Password
