const express = require('express')

const { ctrlWrapper } = require('../../helpers')
const {
  validateBody,
  authenticateUser,
  validateRequestId,
} = require('../../middlewares')
const { addResults } = require('../../controllers/users')
const { addResultSchema } = require('../../models')

const router = express.Router()

router.patch(
  '/:id/results',
  authenticateUser,
  validateRequestId,
  validateBody(addResultSchema),
  ctrlWrapper(addResults)
)

module.exports = router
