const hasConflict = ({ name, code }) =>
  name === 'MongoServerError' && code === 1100

const handleSchemaValidationErrors = (error, _, next) => {
  error.status = hasConflict(error) ? 409 : 400
  next()
}

module.exports = handleSchemaValidationErrors
