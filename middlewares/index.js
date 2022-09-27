const validateBody = require('./validateBody')

module.exports = {
  validateBody,
  ...require('./authenticateUser'),
  ...require('./validateRequestId'),
}
