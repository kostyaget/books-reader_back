const { RequestError } = require('../../helpers')

const addResults = async (req, res) => {
  const { id: userId } = req.params
  const { progress, _id: authenticatedUserId } = req.user
  console.log(userId, authenticatedUserId)

  if (userId !== authenticatedUserId.toString()) throw RequestError(403)

  progress.push(req.body)

  res.json({ ...req.user })
}

module.exports = { addResults }
