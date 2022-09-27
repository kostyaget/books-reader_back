const { isValidObjectId } = require('mongoose')
const { RequestError } = require('../helpers')

const validateRequestId = ({ params }, _, next) => {
  const hasCorrectId = isValidObjectId(params.id)

  !hasCorrectId && next(RequestError(400, `Incorrect ID format: ${id}`))

  next()
}

module.exports = { validateRequestId }
