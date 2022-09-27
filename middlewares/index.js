const validateBody = require('./validateBody')

module.exports = {
  validateBody,
  ...require('./validateRequestId'),
}
