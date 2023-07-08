const labelService = require("../service/label.service")

const verifyLabelsExists = async (ctx, next) => {
  const { labels } = ctx.request.body

  const newLabels = []
  for (let name of labels) {
    const result = await labelService.queryLabelByName(name)
    const labelObj = { name }

    if (result) {
      labelObj.id = result.id
    } else {
      const insertResult = await labelService.create(name)
      labelObj.id = insertResult.insertId
    }

    newLabels.push(labelObj)
  }
  ctx.labels = newLabels

  await next()
}

module.exports = {
  verifyLabelsExists,
}
